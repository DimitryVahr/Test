import Account from '@/views/Account.vue'
import { EAccountRoutes, EAccountRoutesNames } from '@/models/userAccount/router'

export const accountRoutes = [
  {
    path: EAccountRoutes.Account,
    redirect: EAccountRoutes.Profile
  },
  {
    path: EAccountRoutes.Profile,
    name: EAccountRoutesNames.Profile,
    component: Account,
    meta: {
      isHeaderFlightButton: true,
      title: 'Личный кабинет'
    }
  },
  {
    path: EAccountRoutes.Bonuses,
    name: EAccountRoutesNames.Bonuses,
    component: Account,
    meta: {
      isHeaderFlightButton: true,
      title: 'Личный кабинет'
    }
  },
  {
    path: EAccountRoutes.Passengers,
    name: EAccountRoutesNames.Passengers,
    component: Account,
    meta: {
      isHeaderFlightButton: true,
      title: 'Личный кабинет'
    }
  },
  {
    path: EAccountRoutes.FlightRecords,
    name: EAccountRoutesNames.FlightRecords,
    component: Account,
    meta: {
      isHeaderFlightButton: true,
      title: 'Личный кабинет'
    }
  },
  {
    path: EAccountRoutes.Organization,
    name: EAccountRoutesNames.Organization,
    component: Account,
    meta: {
      isHeaderFlightButton: true,
      title: 'Личный кабинет'
    }
  }
]
