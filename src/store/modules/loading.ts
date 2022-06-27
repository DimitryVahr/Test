import { Module } from 'vuex'

interface ILoadingState {
  isLoading: boolean
}

export const loadingStore: Module<ILoadingState, never> = {
  state: () => ({
    isLoading: false
  }),
  getters: {
    getIsLoading(state): boolean {
      return state.isLoading
    }
  },
  mutations: {
    mutIsLoading(state, newValue: boolean) {
      state.isLoading = newValue
    }
  },
  actions: {},
}
