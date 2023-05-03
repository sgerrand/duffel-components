import { config } from "dotenv";
import { Offer } from "../src/types/Offer";
import prompts from "prompts";
import fs from "fs";
import { withPlural } from "../src/lib/withPlural";

config({ path: ".env.local" });

const DUFFEL_API_TOKEN = process.env.DUFFEL_API_TOKEN || "";
const DUFFEL_API_URL = process.env.DUFFEL_API_URL || "";
const VERBOSE = process.env.VERBOSE === "true";

if (DUFFEL_API_URL.includes("localhost"))
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const duffelHeaders = {
  "Duffel-Version": "v1",
  "Accept-Encoding": "gzip",
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${DUFFEL_API_TOKEN}`,
};

export const makeMockDateInTheFuture = (daysAhead) => {
  const now = new Date(Date.now());
  now.setDate(now.getDate() + daysAhead);
  return now;
};

const createOfferRequest = async (
  sliceInput: [string, string][],
  adults: number,
  requestedSources?: string[]
) => {
  const data = {
    slices: sliceInput.map(([origin, destination], index) => ({
      origin,
      destination,
      departure_date: makeMockDateInTheFuture(7 * (index + 1))
        .toISOString()
        .split("T")[0],
    })),
    passengers: Array(adults).fill({ type: "adult" }),
    ...(requestedSources && { requested_sources: requestedSources }),
  };

  const response = await fetch(
    DUFFEL_API_URL + "/air/offer_requests?return_offers=true",
    {
      method: "POST",
      headers: duffelHeaders,
      body: JSON.stringify({ data }),
    }
  );

  return await response.json();
};

const getOffer = async (offerId: string): Promise<{ data: Offer }> => {
  const response = await fetch(
    process.env.DUFFEL_API_URL +
      `/air/offers/${offerId}/?return_available_services=true`,
    { headers: duffelHeaders }
  );

  return await response.json();
};

const getSeatMaps = async (offerId: string) => {
  const response = await fetch(
    process.env.DUFFEL_API_URL + `/air/seat_maps?offer_id=${offerId}`,
    { headers: duffelHeaders }
  );

  return await response.json();
};

const main = async () => {
  try {
    // prompt user for how many slices they want
    const { sliceCount } = await prompts({
      type: "number",
      name: "sliceCount",
      message: "How many slices do you want?",
      initial: 2,
    });

    // for each slice, prompt for origin and destination
    const sliceInput = new Array<[string, string]>(sliceCount);
    for (let i = 0; i < sliceCount; i++) {
      let origin = sliceInput[i - 1]?.[0];
      console.log(`\nSlice #${i + 1}`);
      const { value } = await prompts({
        type: "text",
        name: "value",
        message: "What is the origin?",
        limit: 3,
      });
      origin = value;

      const { destination } = await prompts({
        type: "text",
        name: "destination",
        message: "What is the destination?",
        limit: 3,
      });
      sliceInput[i] = [origin, destination];
    }

    // ask how many adults
    console.log(`\n`);
    const { adultCount } = await prompts({
      type: "number",
      name: "adultCount",
      message: "How many adults traveling?",
      initial: 1,
    });

    // ask for requested sources
    console.log(`\n`);
    const { requestedSources } = await prompts({
      type: "text",
      name: "requestedSources",
      message: "What sources do you want to request?",
      initial: "duffel_airways",
    });

    // run search
    const { data: offerRequest } = await createOfferRequest(
      sliceInput,
      adultCount,
      requestedSources ? requestedSources.split(",") : undefined
    );
    if (VERBOSE) {
      const airlines = new Set(
        offerRequest.offers.map((offer) => offer.owner.iata_code)
      );
      console.log(
        `Received ${withPlural(
          offerRequest.offers.length,
          "offer",
          "offers"
        )} back ` +
          `from ${withPlural(
            airlines.size,
            "airline",
            "airlines"
          )}(${Array.from(airlines.values()).join(",")})`
      );
      console.log(
        `Search completed, offer request ID: ${offerRequest.id}.\nUsing first offer to get services: ${offerRequest.offers[0].id}\n`
      );
    }

    // get offer
    const { data: firstOffer } = await getOffer(offerRequest.offers[0].id);

    // save to src/fixtures/offer
    const _description =
      `This fixture was generated by scripts/generate-fixture.ts. ` +
      `It includes an offer with ${withPlural(
        adultCount,
        "passenger",
        "passengers"
      )} and ` +
      `${withPlural(sliceCount, "slice", "slices")}: ${sliceInput.join(" ⇢ ")}`;

    // Set offer to expire in 10 years so that this fixture won't trigger the
    // "expired" error in the future.
    const expires_at = makeMockDateInTheFuture(365 * 10).toISOString();

    fs.writeFileSync(
      `src/fixtures/offers/${firstOffer.id}.json`,
      JSON.stringify({ _description, ...firstOffer, expires_at }, null, 2)
    );

    // get seat maps
    const { data: seatMaps } = await getSeatMaps(firstOffer.id);

    // save to src/fixtures/seat-maps
    fs.writeFileSync(
      `src/fixtures/seat-maps/${firstOffer.id}.json`,
      JSON.stringify(seatMaps, null, 2)
    );

    console.log(`\n🐄 Fixtures saved for ${firstOffer.id}`);
    console.log(`  ↳ /src/fixtures/offer/${firstOffer.id}.json`);
    console.log(`  ↳ /src/fixtures/seat-maps/${firstOffer.id}.json\n`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default main();
