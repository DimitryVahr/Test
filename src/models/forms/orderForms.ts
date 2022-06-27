interface ISmallOrderFormDates {
  dateFrom: string
  dateTo: string
}
export interface ISmallOrderForm extends ISmallOrderFormDates {
  departureCity: number | null,
  arrivalCity: number | null,
}

export interface ISmallOrderFormHelicopter extends ISmallOrderFormDates {
  departureCity: string
  arrivalCity: string
}

export interface IHelicopterOrderForm extends ISmallOrderFormHelicopter {
  fullName: string,
  email: string,
  phone: string,
  workDescription: string,
}
