import { createStore } from 'vuex'

import { modalsStore } from '@/store/modules/modals'
import { alertStore } from '@/store/modules/alert'
import { orderFormsStore } from '@/store/modules/forms/orderForms'
import { userStore } from '@/store/modules/user'
import { flightsStore } from '@/store/modules/flights'
import { bonusesStore } from '@/store/modules/bonuses'
import { passengersStore } from '@/store/modules/passengers'
import { flightRegistrationStore } from '@/store/modules/flightRegistration'
import { eyesightPluginStore } from '@/store/modules/eyesightPlugin'
import { contactStore } from '@/store/modules/contact'
import { loadingStore } from '@/store/modules/loading'

export default createStore({
  modules: {
    modalsStore,
    alertStore,
    orderFormsStore,
    userStore,
    flightsStore,
    bonusesStore,
    passengersStore,
    flightRegistrationStore,
    eyesightPluginStore,
    contactStore,
    loadingStore
  },
})
