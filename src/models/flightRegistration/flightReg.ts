import { IDestination } from '@/models/flightRegistration/api'

export type TFlightRegPassenger = 'adult' | 'adultLocal' | 'adultForeign' | 'child' | 'childForeign' | 'infant'

export interface IFormattedSection {
  id: number,
  title: string,
  shorttitle: string,
  destinations: IDestination[]
}

export interface ISectionRecord {
  fromId?: number,
  toId?: number | null,
}

export interface IFlightInfo {
  from: string,
  to: string,
  dateTo: string,
  dateBack: string,
  passengers: TFlightRegPassenger[],
  totalPrice: number,
  bonusPaying?: number,
  isPayingWithBonuses: boolean,
}

export type TFlightRegFormStatus = 'Normal' | 'Error' | 'Success'
export type TFlightRegFormType = TFlightRegPassenger | 'Bonus' | 'Contact'

export interface IFlightRegFormStatus {
  formId: string,
  status: TFlightRegFormStatus,
  formType: TFlightRegFormType,
  errorText?: string
}
