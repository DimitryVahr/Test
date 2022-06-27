export type TFlightSchedule = (1 | 2 | 3 | 4 | 5 | 6 | 7)[]

export interface IFlightRoute {
  from: string,
  to: string,
  transport?: string
}

export interface IFlight {
  schedule: TFlightSchedule,
  route: IFlightRoute,
}
