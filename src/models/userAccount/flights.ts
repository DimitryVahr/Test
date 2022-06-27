import { IApiResponse } from '@/models/api'

export interface IFlightRecord {
  aisId?: number,
  aisSyncStatus?: number,
  aisSyncTime?: number,
  canceled?: number,
  data?: {
    itinerary?: {
      datefrom?: string,
      dateto?: string,
      placefrom?: {
        destinations?: {
          id?: {
            placeFrom?: {
              id?: number,
              shorttitle?: string,
              title?: string
            },
            placeTo?: {
              id?: number,
              shorttitle?: string,
              title?: string
            },
            price?: {
              adult?: number,
              adultForeign?: number,
              adultLocal?: number,
              child?: number,
              childForeign?: number,
              infant?: number,
              luggage?: number
            },
            timetable?: number[],
            timetableExcludedDate?: string[],
            title?: string,
            tt?: {
              additionalDays?: string[],
              excludedDays?: string[],
            }
          }
        },
        id?: number,
        shorttitle?: string,
        title?: string
      },
      placeto?: {
        id?: number,
        shorttitle?: string,
        title?: string
      },
      tariff?: {
        adult?: number,
        adultForeign?: number,
        adultLocal?: number,
        child?: number,
        childForeign?: number,
        infant?: number
      },
      totalPrice?: number
    },
    passengers?: [
      {
        id?: number,
        type?: string,
        firstName?: string,
        lastName?: string,
        patronymic?: string,
        sex?: string,
        state?: string,
        birthday?: string,
        phone?: string,
        email?: string,
        documentType?: string,
        documentNumber?: string,
        isLocal?: '0' | '1',
        isUserProfile?: true,
        bonusCard?: string,
        bonusPaying?: number,
        imagesIds?: number[],
      }
    ],
    user?: {
      email?: string,
      name?: string,
      phone?: string,
      surname?: string,
      type?: number
    }
  },
  dataJ?: string,
  forwardRequestId?: number,
  id?: number,
  status?: number,
  time?: number,
  userId?: number
}

export interface IFlightRecordsResponse extends IApiResponse {
  flightRecords?: IFlightRecord[]
}

export interface IFlightRecordResponse extends IApiResponse {
  flightRecord?: IFlightRecord
}

export enum EAccountFlightScreens {
  AccountFlightRecordsFlight = 'AccountFlightRecordsFlight',
  AccountFlightRecordsOffer = 'AccountFlightRecordsOffer',
  AccountFlightRecordsInfo = 'AccountFlightRecordsInfo',
  AccountFlightRecordsEmpty = ''
}
