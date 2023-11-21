import { OfferSlice } from "@duffel/api/types";
import { convertDurationToString } from "@lib/convertDurationToString";
import { getDayDiff } from "@lib/getDayDiff";
import { getSliceDetails } from "@lib/getSliceDetails";
import { isISO8601Duration } from "@lib/isISO8601Duration";
import { SliceLayoverItem } from "src/types/TravelDetails";

export interface SliceCardProps {}

export interface SliceCardProps {
  slice: OfferSlice;
  showFullDate?: boolean;
  showFlightNumbers?: boolean;
  hideFareBrand?: boolean;
  highlightAll?: boolean;
  keysToHighlight?: string[];
  //   highlightColor?: ColorWithoutWeight;
}

export const SliceCard: React.FC<SliceCardProps> = ({
  slice,
  showFullDate = false,
  showFlightNumbers,
  hideFareBrand = false,

  keysToHighlight,
  //   highlightColor,
}) => {
  const { segments } = slice;
  const firstSegment = segments[0];
  const sliceDetails = getSliceDetails(slice);
  const lastSegment = segments[segments.length - 1];
  const departingAt = sliceDetails[0].travelDetails?.departingAt;
  const arrivingAt =
    sliceDetails[sliceDetails.length - 1].travelDetails?.arrivingAt;
  // We need to strip out the time as getDayDiff rounds the time difference up, but here we
  // only care whether the day is the same or not
  const dayDiff =
    departingAt && arrivingAt
      ? getDayDiff(arrivingAt.split("T")[0], departingAt.split("T")[0])
      : 0;
  const duration =
    slice.duration &&
    typeof slice.duration === "string" &&
    isISO8601Duration(slice.duration) &&
    arrivingAt &&
    departingAt
      ? convertDurationToString(String(slice.duration))
      : null;

  const numberOfStops = sliceDetails.filter(
    (item) => item.type === "layover"
  ).length;

  const layoverItems = (sliceDetails.filter(
    (item) => item.type === "layover"
    // using type assertion here because typescript cannot infer that item.type of 'layover' is SliceLayoverItem
  ) || []) as SliceLayoverItem[];

  return (
    <div className={styles["slice-summary-info"]}>
      <div className={styles["slice-summary-info__airline-logo-wrapper"]}>
        <AirlineLogo
          name={firstSegment.marketingCarrier.name}
          iataCode={firstSegment.marketingCarrier.iataCode}
          size={40}
        />
      </div>
      <div>
        <VSpace space={8} className={styles["slice-summary-info__column"]}>
          <div>
            {showFullDate && departingAt && (
              <span className={styles["slice-summary-info__date-label"]}>
                {getDateString(departingAt, "long")}
              </span>
            )}

            {departingAt && arrivingAt && (
              <span className="u-skeletonable" {...highlightStyles()}>
                <span {...highlightStyles("departingAt")}>
                  {getTimeString(departingAt)}
                </span>
                {" - "}
                <span>
                  <span>{getTimeString(arrivingAt)}</span>
                  {dayDiff > 0 && (
                    <sup
                      className={
                        keysToHighlight?.includes("arrivingAt") &&
                        !keysToHighlight?.includes("dayDiff")
                          ? styles["slice-summary-info__sup--pad"]
                          : undefined
                      }
                    >
                      +{dayDiff}
                    </sup>
                  )}
                </span>
              </span>
            )}
          </div>
          <div>
            <span className="u-skeletonable u-skeletonable--small">
              {getAirlinesText(slice, showFlightNumbers, !hideFareBrand)}
            </span>
          </div>
        </VSpace>
        <VSpace space={8} className={styles["slice-summary-info__column"]}>
          {duration && (
            <div>
              <span className="u-skeletonable">{duration}</span>
            </div>
          )}
          <div>
            <span className="u-skeletonable u-skeletonable--small">
              {firstSegment.origin.iataCode} -{" "}
              {lastSegment.destination.iataCode}
            </span>
          </div>
        </VSpace>
        <VSpace space={8} className={styles["slice-summary-info__column"]}>
          <div>
            <span className="u-skeletonable">
              {numberOfStops === 0
                ? "Non-stop"
                : `${numberOfStops} stop${numberOfStops > 1 ? "s" : ""}`}
            </span>
          </div>
          <div>
            <div />
            {layoverItems.map(({ layoverDetails }, index) => (
              <div className="u-skeletonable" key={index}>
                {layoverDetails.duration} {layoverDetails.airport.iataCode}
              </div>
            ))}
          </div>
        </VSpace>
      </div>
    </div>
  );
};
