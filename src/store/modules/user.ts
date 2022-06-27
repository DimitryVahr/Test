import { Module } from 'vuex'
import { IStringObject, ISelectItem } from '@/models/breadcrumbs'
import { objectUtil } from '@/utils/utilsModules/objectUtil'
import { IUserFullInfo } from '@/models/forms/userForms'
import { IUserBonuses } from '@/models/userAccount/api'

interface IUserState {
  authKey: string
  userInfo: IUserFullInfo,
  states: IStringObject,
  documentTypes: IStringObject,
  bonusesInfo: IUserBonuses,
}

export const userStore: Module<IUserState, never> = {
  state: () => ({
    authKey: localStorage.getItem('authKey') || '',
    userInfo: {} as IUserFullInfo,
    states: {} as IStringObject,
    documentTypes: {} as IStringObject,
    bonusesInfo: {} as IUserBonuses,
  }),
  getters: {
    getAuthKey(state): string {
      return state.authKey
    },

    getUserInfo(state): IUserFullInfo {
      return state.userInfo
    },

    getStates(state): (preparedForSelect: boolean) => ISelectItem[] | IStringObject {
      return (preparedForSelect = false) => {
        if (preparedForSelect) {
          return objectUtil.convertToSelectArray(state.states)
        }
        return state.states
      }
    },

    getDocumentTypes(state): (preparedForSelect: boolean) => ISelectItem[] | IStringObject {
      return (preparedForSelect = false) => {
        if (preparedForSelect) {
          return objectUtil.convertToSelectArray(state.documentTypes)
        }
        return state.documentTypes
      }
    },

    getAuthConfig(state): Record<string, unknown> {
      return {
        headers: {
          'Authorization': `Bearer ${ state.authKey }`,
        }
      }
    },

    getBonusesInfo(state) {
      return state.bonusesInfo
    }
  },

  mutations: {
    mutAuthKey(state, newValue: string) {
      state.authKey = newValue
    },

    mutUserInfo(state, newValue: IUserFullInfo) {
      state.userInfo = newValue
    },

    mutStates(state, newValue: IStringObject) {
      state.states = newValue
    },

    mutDocumentTypes(state, newValue: IStringObject) {
      state.documentTypes = newValue
    },

    mutBonusesInfo(state, newValue: IUserBonuses) {
      state.bonusesInfo = newValue
    }
  },
  actions: {},
}
