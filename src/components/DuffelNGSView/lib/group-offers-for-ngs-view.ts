import { NGSShelf, OfferSliceWithNGS, OfferWithNGS } from ".";

export type NGSOfferRow = Record<"slice", OfferSliceWithNGS> &
  Record<NGSShelf, OfferWithNGS | null>;

export const getNGSSliceKey = (slice: OfferSliceWithNGS): string => {
  const firstSegment = slice.segments[0];
  const lastSegment = slice.segments[slice.segments.length - 1];
  // TODO: Confirm whether this is the correct and complete list of comparison fields
  return `${firstSegment.marketing_carrier.id}-${firstSegment.departing_at}-${lastSegment.arriving_at}`;
};

const filterOffersThatMatchCurrentSlice = (
  offers: OfferWithNGS[],
  previousSliceKeys: string[]
) => {
  const filteredOffers = previousSliceKeys.length > 0 ? [] : offers;
  if (previousSliceKeys.length > 0) {
    for (const offer of offers) {
      let match = true;
      for (const [index, sliceKey] of previousSliceKeys.entries()) {
        if (sliceKey !== getNGSSliceKey(offer.slices[index])) {
          match = false;
          break;
        }
      }
      if (match) {
        filteredOffers.push(offer);
      }
    }
  }
  return filteredOffers;
};

export const groupOffersForNGSView = (
  offers: OfferWithNGS[],
  sliceIndex: number,
  previousSliceKeys: string[]
): NGSOfferRow[] => {
  // Only display offers where previous slices match the current selection
  const filteredOffers = filterOffersThatMatchCurrentSlice(
    offers,
    previousSliceKeys
  );

  const offersMap: Record<string, NGSOfferRow> = {};
  filteredOffers.forEach((offer) => {
    if (sliceIndex > offer.slices.length) {
      throw new Error(
        "Attempted to call `groupOffersForNGSView` with an invalid slice index"
      );
    }

    const slice = offer.slices[sliceIndex];
    const sliceKey = getNGSSliceKey(slice);
    if (offersMap[sliceKey]) {
      offersMap[sliceKey][slice.ngs_shelf] = offer;
    } else {
      offersMap[sliceKey] = {
        slice: offer.slices[sliceIndex],
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        [slice.ngs_shelf]: offer,
      };
    }
  });

  return Object.values(offersMap);
};
