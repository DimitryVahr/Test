import { Module } from 'vuex'

interface IContactState {
  isMessageToDirector: boolean
}

export const contactStore: Module<IContactState, never> = {
  state: () => ({
    isMessageToDirector: false
  }),
  getters: {
    getIsMessageToDirector(state): boolean {
      return state.isMessageToDirector
    }
  },
  mutations: {
    mutIsMessageToDirector(state, newValue: boolean) {
      state.isMessageToDirector = newValue
    }
  },
  actions: {},
}
