import { TFlightRegPassenger } from '@/models/flightRegistration/flightReg'

export interface ITariffCard {
  passengerType: TFlightRegPassenger,
  price: number,
  tip?: string,
}

export type TTariffTotalPassengers = {
  [key in TFlightRegPassenger]: number;
};
