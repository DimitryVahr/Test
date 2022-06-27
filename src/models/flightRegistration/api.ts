import { IFlightRegPassenger } from '@/components/common/FlightRegistration/FlightRegTabs/FlightRegPassengers/types'
import { IApiResponse } from '@/models/api'
import { IUserInfoResponse } from '../userAccount/api'

export interface IDestination {
  placeFrom: {
    id: number,
    shorttitle: string,
    title: string
  },
  placeTo: {
    id: number,
    shorttitle: string,
    title: string
  },
  price: {
    adult: number,
    adultForeign: number,
    adultLocal: number,
    child: number,
    childForeign: number,
    infant: number,
    luggage: number
  },
  timetable: number[],
  timetableExcludedDate: string[],
  title: string,
  tt: {
    additionalDays: string[],
    excludedDays: string[],
  }
}

export interface ISection {
  destinations: Record<string, IDestination>,
  place: {
    id: number,
    shorttitle: string,
    title: string
  }
}

export interface ISections {
  [key: string]: ISection
}

export interface IGetSectionsResponse extends IApiResponse {
  sections?: ISections
}

export interface IAircraftTransport {
  aircraft: {
    name: string,
    type: 'plane' | 'helicopter'
  },
  capacity_total: number,
}

export interface IAircraftPart extends IAircraftTransport {
  from: {
    description: string,
    name: string
  },
  to: {
    description: string,
    name: string
  }
}

export interface IAvailableCapacityBody {
  date: string,
  waypoints: [number, number]
}

export interface IAvailableCapacity {
  capacity_available?: number,
  first_part?: IAircraftPart,
  second_part?: IAircraftPart
}

export interface IAvailableCapacityResponse extends IApiResponse {
  data?: IAvailableCapacity
}

export interface IFlightRegSubmit {
  itinerary: {
    datefrom: string,
    dateto: string | null,
    placefrom: {
      id: number,
      shorttitle: string,
      title: string
      destinations: Record<string, IDestination>,
    },
    placeto: {
      id: number,
      shorttitle: string,
      title: string
    },
    tariff: {
      adult: number,
      adultForeign: number,
      adultLocal: number,
      child: number,
      childForeign: number,
      infant: number
    },
    totalPrice: number
  },
  passengers: IFlightRegPassenger[],
  user: {
    email: string,
    name: string,
    phone: string,
    surname: string,
    type: number
  },
  bonusPaying?: number
}

export interface IOrderHelicopter {
  date: string
  comment: string
  itinerary: string
  user: {
    name: string
    phone: string
    email: string
    type: 1 | 2
  }
}

export interface IOrderHelicopterResponse extends IApiResponse {
  user?: {
    authKey: string,
    id: number,
    profile: IUserInfoResponse
  }
}
