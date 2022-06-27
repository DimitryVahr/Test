import { Module } from 'vuex'

interface IEyesighttPluginState {
  isImagesHidden: boolean
}

export const eyesightPluginStore: Module<IEyesighttPluginState, never> = {
  state: () => ({
    isImagesHidden: false
  }),

  getters: {
    getIsImagesHidden(state): boolean {
      return state.isImagesHidden
    }
  },

  mutations: {
    mutIsImagesHidden(state, payload: boolean): void {
      state.isImagesHidden = payload
    }
  },
  actions: {},
}
