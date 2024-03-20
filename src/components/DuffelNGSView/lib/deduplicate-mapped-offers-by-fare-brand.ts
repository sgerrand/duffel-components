import { Offer, OfferSliceSegmentPassenger } from "@duffel/api/types";
import { NGSOfferRow } from "./group-offers-for-ngs-view";
import { NGS_SHELVES } from ".";

// Deduplicate fare brands (only show the cheapest offer within fare brand)
export const deduplicateMappedOffersByFareBrand = (
  offersMap: Record<string, NGSOfferRow>,
) => {
  Object.entries(offersMap).map(([sliceKey, row]) => {
    const deduplicatedRow: NGSOfferRow = {
      slice: row.slice,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    };
    NGS_SHELVES.map((shelf) => {
      if (row[shelf]) {
        deduplicatedRow[shelf] = groupByFareBrandName(row[shelf]!)
          .map((offers) => getCheapestOffer(offers))
          .flat();
      }
    });
    offersMap[sliceKey] = deduplicatedRow;
  });
  return offersMap;
};

export const getFareBrandNameForOffer = (offer: Offer): string => {
  // Cabin class can vary within a slice across passengers and segments. Here we
  // make a list of all cabin classes present in the slice.
  const cabinClasses = offer.slices[0].segments
    .flatMap((segment) => segment.passengers)
    .reduce<OfferSliceSegmentPassenger["cabin_class"][]>(
      (cabinClasses, passenger) => {
        if (cabinClasses.includes(passenger.cabin_class)) {
          return cabinClasses;
        }
        return [...cabinClasses, passenger.cabin_class];
      },
      [],
    );

  return offer.slices[0].fare_brand_name || cabinClasses.join("/");
};

export const getCheapestOffer = (offers: Offer[]) =>
  offers.find(
    (offer) =>
      +offer.total_amount ==
      Math.min(...offers.map((offer) => +offer.total_amount)),
  )!;

export const groupByFareBrandName = (offers: Offer[]) => {
  const groupedResult: { [key: string]: Offer[] } = offers.reduce(
    (previous: { [key: string]: Offer[] }, current: Offer) => {
      const key = getFareBrandNameForOffer(current);
      if (!previous[key]) {
        previous[key] = [];
      }

      previous[key].push(current);
      return previous;
    },
    {},
  );
  return Object.values(groupedResult);
};
