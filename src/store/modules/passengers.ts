import { Module } from 'vuex'
import { IPassenger, IPassengerInfo } from '@/models/userAccount/api'

interface IPassengersState {
  passengers: IPassengerInfo []
  passenger: IPassenger | null
}

export const passengersStore: Module<IPassengersState, never> = {
  state: () => ({
    passengers: [] as IPassengerInfo[],
    passenger: null
  }),

  getters: {
    getPassengers(state): IPassengerInfo[] {
      return state.passengers
    },
    getPassenger(state): IPassenger | null {
      return state.passenger
    }
  },

  mutations: {
    mutPassengers(state, newValue: IPassengerInfo[]) {
      state.passengers = newValue
    },
    mutPassenger(state, newValue: IPassenger) {
      state.passenger = newValue
    }
  },
  actions: {},
}
