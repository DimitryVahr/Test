import { Module } from 'vuex'
import { ISmallOrderForm, ISmallOrderFormHelicopter } from '@/models/forms/orderForms'

interface IOrderFormsState {
  helicopterFormSmall: ISmallOrderFormHelicopter
  passengerFormSmall: ISmallOrderForm
}

export const orderFormsStore: Module<IOrderFormsState, never> = {
  state: () => ({
    helicopterFormSmall: {} as ISmallOrderFormHelicopter,
    passengerFormSmall: {} as ISmallOrderForm
  }),
  getters: {
    getHelicopterFormSmall(state) {
      return state.helicopterFormSmall
    },
    getPassengerFormSmall(state): ISmallOrderForm {
      return state.passengerFormSmall
    }
  },
  mutations: {
    mutHelicopterFormSmall(state, newValue: ISmallOrderFormHelicopter) {
      state.helicopterFormSmall = newValue
    },
    mutPassengerFormSmall(state, newValue: ISmallOrderForm) {
      state.passengerFormSmall = newValue
    }
  },
  actions: {},
}
