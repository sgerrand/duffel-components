import { DuffelCheckoutProps } from "@components/DuffelCheckout";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { getTotalAmountForServices } from "./getTotalAmountForServices";

interface CompileCreateOrderPayloadInput {
  offer: Offer;
  passengers: DuffelCheckoutProps["passengers"];
  baggageSelectedServices: CreateOrderPayloadServices;
  seatSelectedServices: CreateOrderPayloadServices;
}

export const compileCreateOrderPayload = ({
  baggageSelectedServices,
  seatSelectedServices,
  offer,
  passengers,
}: CompileCreateOrderPayloadInput): Partial<CreateOrderPayload> => {
  const services = [
    ...filterServicesForPayload(baggageSelectedServices),
    ...filterServicesForPayload(seatSelectedServices),
  ];

  const totalAmountWithServices =
    +offer.total_amount + getTotalAmountForServices(offer, services);

  return {
    ...(offer && { selected_offers: [offer.id] }),
    passengers,
    services,
    ...(offer && {
      payments: [
        {
          type: "balance",
          amount: `${totalAmountWithServices}`,
          currency: offer.total_currency,
        },
      ],
    }),
    type: "instant",
    metadata: { source: "duffel-checkout@v1.0" },
  };
};

const filterServicesForPayload = (
  selectedServices: CreateOrderPayloadServices
): CreateOrderPayloadServices => {
  if (!Array.isArray(selectedServices)) return [];
  return selectedServices.filter(({ quantity }) => quantity > 0);
};
