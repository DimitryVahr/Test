import { Module } from 'vuex'
import { EModalsNames } from '@/models/modals'

interface IModalsState {
  openedModalName: EModalsNames | null,
  openedAdditionalModalName: EModalsNames | null,
  documentsPreviewImgName: string
}

export const modalsStore: Module<IModalsState, never> = {
  state: () => ({
    openedModalName: null,
    openedAdditionalModalName: null,
    documentsPreviewImgName: '',
  }),
  getters: {
    getOpenedModalName(state): EModalsNames | null {
      return state.openedModalName
    },

    getOpenedAdditionalModalName(state): EModalsNames | null {
      return state.openedAdditionalModalName
    },

    getDocumentsPreviewImgName(state): string {
      return state.documentsPreviewImgName
    }
  },
  mutations: {
    mutOpenedModalName(state, newValue: EModalsNames | null) {
      state.openedModalName = newValue
    },

    mutOpenedAdditionalModalName(state, newValue: EModalsNames | null) {
      state.openedAdditionalModalName = newValue
    },

    mutDocumentsPreviewImgName(state, newValue: string) {
      state.documentsPreviewImgName = newValue
    },
  },
  actions: {},
}
