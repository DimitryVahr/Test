import { Module } from 'vuex'
import { IBonusesTransactionItem } from '@/models/userAccount/api'

interface IBonusesState {
  bonusesTransactions: IBonusesTransactionItem[]
}

export const bonusesStore: Module<IBonusesState, never> = {
  state: () => ({
    bonusesTransactions: [] as IBonusesTransactionItem[]
  }),

  getters: {
    getBonusesTransactions(state): IBonusesTransactionItem[] {
      return state.bonusesTransactions
    },

    getSpecificBonus(state): (recordId: number) => IBonusesTransactionItem {
      return (recordId) => {

        let specificBonus = {} as IBonusesTransactionItem

        state.bonusesTransactions.forEach((bonusTrans) => {
          if (bonusTrans.itinerary.id === recordId) {
            specificBonus = bonusTrans
          }
        })
        return specificBonus
      }
    },
  },

  mutations: {
    mutBonusesTransactions(state, newValue: IBonusesTransactionItem[]) {
      state.bonusesTransactions = newValue
    },
  },
  actions: {},
}
