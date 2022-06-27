import { Module } from 'vuex'
import { sortBy } from 'lodash'
import { EFlightRegStages } from '@/models/flightRegistration/regSteps'
import {
  IFlightInfo,
  IFlightRegFormStatus,
  IFormattedSection,
  ISectionRecord,
  TFlightRegPassenger
} from '@/models/flightRegistration/flightReg'
import { IAvailableCapacity, IDestination, ISections } from '@/models/flightRegistration/api'
import rootStore from '../rootStore'

interface IFlightRegistrationState {
  flightRegStep: EFlightRegStages,
  sections: IFormattedSection[],
  sectionRecord: ISectionRecord,
  flightInfo: IFlightInfo,
  flightRegFormsStatuses: IFlightRegFormStatus[],
  aircraftInfo: IAvailableCapacity
}

export const flightRegistrationStore: Module<IFlightRegistrationState, never> = {
  state: () => ({
    flightRegStep: EFlightRegStages.Tariffs,
    sections: [] as IFormattedSection[],
    sectionRecord: {} as ISectionRecord,
    flightInfo: {} as IFlightInfo,
    flightRegFormsStatuses: [] as IFlightRegFormStatus[],
    aircraftInfo: {} as IAvailableCapacity,
  }),
  getters: {
    getFlightRegStep(state): EFlightRegStages {
      return state.flightRegStep
    },
    getSections(state): IFormattedSection[] {
      return state.sections
    },
    getSectionNameById(state): (id: number) => string {
      return (id) => {
        let sectionName = ''

        if (state.sections.length && id) {
          state.sections.forEach((section) => {
            if (section.id === id) {
              sectionName = section.title
            }
          })
        }
        return sectionName
      }
    },
    getSectionRecord(state): ISectionRecord {
      return state.sectionRecord
    },
    getFlightInfo(state): IFlightInfo {
      return state.flightInfo
    },
    getFlightInfoPassengers(state): TFlightRegPassenger[] {
      return state.flightInfo.passengers
    },
    getFlightRegFormsStatuses(state): IFlightRegFormStatus[] {
      return state.flightRegFormsStatuses
    },

    // Возвращает недоступные к полету даты при выборе пользователем точек вылета и прилета
    getFlightDisabledDates(state): string[] {
      const sectRec = state.sectionRecord
      let disabledDates = [] as string[]

      if (sectRec.fromId && sectRec.toId) {
        state.sections.forEach((section: IFormattedSection) => {

          if (sectRec.fromId === section.id) {

            // eslint-disable-next-line consistent-return
            section.destinations.forEach((dest: IDestination): void | string[] => {
              if (sectRec.toId === dest.placeTo.id) {
                disabledDates = dest.timetableExcludedDate
              }
            })

          }

        })
      }
      return disabledDates
    },
    getDestinationInfo(state): IDestination | null {
      const destinations = state.sections.find((section) => section.id === state.sectionRecord.fromId)?.destinations
      if (!destinations?.length) return null
      const selectedDestionation = destinations.find((dest) => dest.placeTo.id === state.sectionRecord.toId) || null
      const formattedPrice = {
        adult: selectedDestionation?.price.adult || 0,
        adultLocal: selectedDestionation?.price.adultLocal || 0,
        child: selectedDestionation?.price.child || 0,
        childForeign: selectedDestionation?.price.childForeign || 0,
        infant: selectedDestionation?.price.infant || 0,
      }
      return {
        ...selectedDestionation,
        price: formattedPrice
      } as IDestination
    },
    getAircraftInfo(state): IAvailableCapacity {
      return state.aircraftInfo
    },
  },
  mutations: {
    mutFlightRegStep(state, newValue: EFlightRegStages) {
      state.flightRegStep = newValue
    },

    mutSections(state, newValue: ISections) {
      const sections = [] as IFormattedSection[]
      Object.keys(newValue)
        .forEach((key) => {
          const currentSection = newValue[key]

          if (currentSection.place) {
            const section = {} as IFormattedSection

            section.id = currentSection.place.id
            section.title = currentSection.place.title
            section.shorttitle = currentSection.place.shorttitle
            section.destinations = Object.values(currentSection.destinations)
            sections.push(section)
          }
        })

      state.sections = sortBy(sections, [(section: IFormattedSection) => {
        return section.title
      }])
    },

    mutSectionRecord(state, newValue: ISectionRecord) {
      state.sectionRecord = { ...state.sectionRecord, ...newValue }
    },

    // Выполняется при сабмите формы тарифов
    mutFlightInfo(state, newValue: IFlightInfo) {
      // Задаем инфу о полете
      state.flightInfo = newValue

      // Задаем дефолтные статусы о заполнении форм пассажиров
      state.flightRegFormsStatuses = newValue.passengers.map((passenger, i) => {
        return {
          formId: passenger + i,
          status: 'Normal',
          formType: passenger
        }
      })
      // Задаем дефолтный статус блока списания бонусов если выбрана оплата бонусами
      if (rootStore.getters.getFlightInfo.isPayingWithBonuses) {
        state.flightRegFormsStatuses.push({
          formId: 'BonusesForm',
          status: 'Normal',
          formType: 'Bonus'
        })
      }
      // Задаем дефолтный статус о заполнении формы контактного лица
      state.flightRegFormsStatuses.push({
        formId: 'ContactForm',
        status: 'Normal',
        formType: 'Contact'
      })
    },

    mutFlightRegFormsStatuses(state, newValue: IFlightRegFormStatus[]) {
      state.flightRegFormsStatuses = newValue
    },

    mutFlightRegFormStatus(state, newValue: IFlightRegFormStatus) {
      state.flightRegFormsStatuses = state.flightRegFormsStatuses.map((form) => {
        if (form.formId === newValue.formId) return newValue
        return form
      })
    },

    mutAircraftInfo(state, newValue: IAvailableCapacity) {
      state.aircraftInfo = newValue
    }
  },
  actions: {},
}
