import { Module } from 'vuex'

interface IAlertState {
  alertText: string
}

export const alertStore: Module<IAlertState, never> = {
  state: () => ({
    alertText: ''
  }),
  getters: {
    getAlertText(state): string {
      return state.alertText
    }
  },
  mutations: {
    mutAlertText(state, newValue: string) {
      state.alertText = newValue
    }
  },
  actions: {},
}
