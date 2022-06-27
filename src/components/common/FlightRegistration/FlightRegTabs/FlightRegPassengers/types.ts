export interface IFlightRegPassenger {
  id: number,
  type: string,
  firstName: string,
  lastName: string,
  patronymic: string,
  sex: 0 | 1,
  state: string,
  birthday: string,
  phone: string,
  email: string,
  documentType: number,
  documentNumber: string,
  isLocal: 0 | 1,
  isUserProfile: boolean,
  bonusCard: string,
  bonusPaying: number,
  imagesIds: number[]
}

export interface IFlightRegUser {
  name: string,
  surname: string,
  email: string,
  phone: string,
  type: number
}
