import { Module } from 'vuex'
import { EAccountFlightScreens, IFlightRecord } from '@/models/userAccount/flights'

interface IFlightsState {
  flightRecords: IFlightRecord[],
  selectedFlightId: number,
  currentFlightScreen: EAccountFlightScreens
}

export const flightsStore: Module<IFlightsState, never> = {
  state: () => ({
    flightRecords: [] as IFlightRecord[],
    selectedFlightId: -1,
    currentFlightScreen: EAccountFlightScreens.AccountFlightRecordsEmpty
  }),

  getters: {
    getFlightRecords(state): IFlightRecord[] {
      return state.flightRecords
    },

    getSelectedFlightId(state): number {
      return state.selectedFlightId
    },

    getCurrentFlightScreen(state): EAccountFlightScreens {
      return state.currentFlightScreen
    }
  },

  mutations: {
    mutFlightRecords(state, newValue: IFlightRecord[]) {
      state.flightRecords = newValue
    },

    mutSingleFlightRecord(state, newValue: IFlightRecord) {

      state.flightRecords = state.flightRecords.map((record) => {
        if (record.id === newValue.id) {
          return newValue
        }
        return record
      })

    },

    mutSelectedFlightId(state, newValue: number) {
      state.selectedFlightId = newValue
    },

    mutCurrentFlightScreen(state, newValue: EAccountFlightScreens) {
      state.currentFlightScreen = newValue
    }
  },
  actions: {}
}
