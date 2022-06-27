import Nav from '@/views/Nav.vue'
import Style from '@/views/Style.vue'
import Modals from '@/views/Modals.vue'
import Main from '@/views/Main.vue'
import Transportation from '@/views/Transportation.vue'
import TransportRules from '@/views/TransportRules.vue'
import TransportationsVip from '@/views/TransportationsVip.vue'
import BaggageRules from '@/views/BaggageRules.vue'
import About from '@/views/About.vue'
import ContactsCompany from '@/views/ContactsCompany.vue'
import TransportationsWork from '@/views/TransportationsWork.vue'
import FlightRegistration from '@/views/FlightRegistration.vue'

export const commonRoutes = [
  {
    path: '/navigation',
    name: 'Nav',
    component: Nav,
  },
  {
    path: '/style',
    name: 'Style',
    component: Style,
  },
  {
    path: '/modals',
    name: 'Modals',
    component: Modals,
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      isTransparentHeader: true,
      title: 'Главная страница',
    }
  },
  {
    path: '/transportations',
    name: 'Transportation',
    component: Transportation,
    meta: {
      isTransparentHeader: true,
      title: 'Пассажирские рейсы',
    }
  },
  {
    path: '/transportation-rules',
    name: 'TransportRules',
    component: TransportRules,
    meta: {
      title: 'Документы',
    }
  },
  {
    path: '/baggage-rules',
    name: 'BaggageRules',
    component: BaggageRules,
    meta: {
      title: 'Правила провоза багажа',
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      isTransparentHeader: true,
      title: 'О компании',
    }
  },
  {
    path: '/contacts',
    name: 'ContactsCompany',
    component: ContactsCompany,
    meta: {
      title: 'Контакты',
    }
  },
  {
    path: '/vip',
    name: 'TransportationsVip',
    component: TransportationsVip,
    meta: {
      isTransparentHeader: true,
      title: 'VIP-перевозки',
    }
  },
  {
    path: '/personalnwork',
    name: 'TransportationsWork',
    component: TransportationsWork,
    meta: {
      isTransparentHeader: true,
      title: 'Индивидуальные полеты',
    }
  },
  {
    path: '/flight-registration',
    name: 'FlightRegistration',
    component: FlightRegistration,
    meta: {
      isTransparentHeader: true,
      isHeaderFlightButton: true,
      title: 'Записаться на рейс',
    }
  },
]
