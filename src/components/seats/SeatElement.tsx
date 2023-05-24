import { moneyStringFormatter } from "@lib/formatConvertedCurrency";
import classNames from "classnames";
import * as React from "react";
import {
  CreateOrderPayloadService,
  CreateOrderPayloadServiceInformationForSeats,
} from "src/types/CreateOrderPayload";
import { SeatMapCabinRowSectionElementSeat } from "src/types/SeatMap";
import { Icon } from "../Icon";
import { SeatInfo } from "./SeatInfo";
import { SeatUnavailable } from "./SeatUnavailable";
import { getPassengerInitials } from "@lib/getPassengerInitials";

interface SeatElementProps {
  element: SeatMapCabinRowSectionElementSeat;
  currentSegmentId: string;
  currentPassengerId: string;
  currentPassengerName: string;
  onSeatToggled: (seatService: CreateOrderPayloadService) => void;
  selectedServicesMap: Record<string, CreateOrderPayloadService>;
}

export const SeatElement: React.FC<SeatElementProps> = ({
  element,
  currentPassengerId,
  currentSegmentId,
  currentPassengerName,
  onSeatToggled,
  selectedServicesMap,
}) => {
  const seatServiceFromElement = element.available_services.find(
    (service) => service.passenger_id === currentPassengerId
  );
  if (!seatServiceFromElement) return <SeatUnavailable seat={element} />;

  const selectedServiceFromMap = Object.values(selectedServicesMap).find(
    (service) =>
      (
        service.serviceInformation as CreateOrderPayloadServiceInformationForSeats
      ).designator === element.designator &&
      service.serviceInformation?.segmentId === currentSegmentId
  );

  const isSeatSelected = selectedServiceFromMap != undefined;

  const seatLabel = isSeatSelected
    ? getPassengerInitials(
        selectedServiceFromMap.serviceInformation?.passengerName
      )
    : element.designator.charAt(element.designator.length - 1);

  const isFeePayable =
    !isNaN(+seatServiceFromElement?.total_amount) &&
    +seatServiceFromElement?.total_amount !== 0;

  const isSeatSelectionAvaiable =
    !isSeatSelected &&
    seatServiceFromElement.passenger_id === currentPassengerId;

  const isActionable =
    !isSeatSelected ||
    (isSeatSelected &&
      currentSegmentId ===
        selectedServiceFromMap.serviceInformation?.segmentId &&
      currentPassengerId ===
        selectedServiceFromMap.serviceInformation?.passengerId);

  const seatClassName = classNames("map-element", "map-element__seat", {
    "map-element--available": isSeatSelectionAvaiable,
    "map-element--selected": isSeatSelected,
    "map-element--actionable": isActionable,
  });

  const priceLabel = moneyStringFormatter(
    seatServiceFromElement.total_currency
  )(+seatServiceFromElement.total_amount);

  const isSeatInfoDisplayed =
    isSeatSelected &&
    currentSegmentId === selectedServiceFromMap.serviceInformation?.segmentId &&
    currentPassengerId ===
      selectedServiceFromMap.serviceInformation?.passengerId;

  return (
    <>
      <button
        data-testid={`seat-${element.designator}`}
        id={element.designator}
        type="button"
        className={seatClassName}
        onClick={() => {
          if (!isActionable) return;
          onSeatToggled({
            quantity: isSeatSelected ? 0 : 1,
            id: seatServiceFromElement.id,
            serviceInformation: {
              type: "seat",
              segmentId: currentSegmentId,
              passengerId: currentPassengerId,
              passengerName: currentPassengerName,
              designator: element.designator,
              disclosures: element.disclosures,
              total_amount: seatServiceFromElement.total_amount,
              total_currency: seatServiceFromElement.total_currency,
            },
          });
        }}
        aria-label={`${element.designator} ${
          element.name || "Seat"
        } ${priceLabel}`}
      >
        {isFeePayable && (
          <Icon
            name="seat_paid_indicator"
            className="map-element--fee-payable"
            size={16}
          />
        )}
        {seatLabel}
      </button>
      {isSeatInfoDisplayed && (
        <SeatInfo seat={element} service={seatServiceFromElement} />
      )}
    </>
  );
};
