import moment from 'moment'
import { DOC_TYPES, PASSENGER_TYPES } from '@/constants/docs'
import { flightStatuses } from '@/constants/statuses'

moment.locale('ru')

export interface IStringUtil {
  preparePhone: (phoneDirty: string) => string,
  formatPhone: (phoneDirty: string, withBraces?: boolean) => string,
  formatDate: (dateStr: string, format: string) => string
  formatNumber: (value: string | number, suffix?: string) => string
  getDocType: (type: string, isLocal?: string) => string
  getPassengerType: (type: string) => string
  getFlightStatus: (status: number) => string
  formatSimpleWord: (amount: number, word: string, onlyWord: boolean) => string
  isStringIncluded: (stringToTest: string, stringToSearch: string) => boolean
  uniqueId: (length?: number) => string
}

export const stringUtil: IStringUtil = {
  /**
   * Убирает лишние символы из номера телефона '+() -'
   */
  preparePhone(phoneDirty) {
    return phoneDirty.replace(/[^0-9]/g, '')
  },

  /**
   * Форматирует номер телефона для вывода на экран
   */
  formatPhone(phoneDirty, withBraces = false) {
    if (!phoneDirty) return ''
    if (withBraces) {
      return phoneDirty.replace(/[^0-9]/g, '')
        .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
    }
    return phoneDirty.replace(/[^0-9]/g, '')
      .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3-$4-$5')
  },

  /**
   * Форматирует дату в соответствии с переданным форматом
   */
  formatDate(dateStr, format) {
    const date = moment(dateStr, ['DD-MM-YYYY', 'DD.MM.YYYY', moment.ISO_8601], true)

    if (date.isValid()) {
      return moment(date)
        .format(format)
    }

    return dateStr
  },

  /**
   * Красиво форматирует число и добавляет к нему префикс
   */
  formatNumber(value, suffix = 'p.') {
    let result: string
    let parsedValue = String(value)

    if (parsedValue === '0') {
      result = '0'
    } else if (!parsedValue) {
      result = ''
    } else if (suffix) {
      parsedValue = String(Math.round(parseFloat(parsedValue) * 100) / 100)
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')

      result = parsedValue
    } else {
      parsedValue = String(Math.round(parseFloat(parsedValue) * 100) / 100)
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
        .replace(/\./g, ',')

      result = parsedValue
    }

    return result === '' ? result : `${ result } ${ suffix }`
  },

  /**
   * Возвращает название документа, удостоверяющего личность
   */
  getDocType(type, isLocal = 'false') {
    let docType = DOC_TYPES[type]

    if (type === '3' && isLocal === '1') {
      docType = `${ docType } с пропиской в Камчатском крае`
    }

    return docType
  },

  /**
   * Возвращает название категории пассажира
   */
  getPassengerType(type: string) {
    return PASSENGER_TYPES[type]
  },

  /**
   * Возвращает название статуса полёта
   */
  getFlightStatus(status: number) {
    return flightStatuses[status]
  },

  /**
   * Склоняет простые слова
   */
  formatSimpleWord(amount, word, onlyWord) {
    let result = ''
    if (!onlyWord) result += `${ this.formatNumber(amount, '') } `
    if ((amount % 100 >= 11 && amount % 100 <= 19)
      || (amount % 10 >= 5 && amount % 10 <= 9)
      || amount % 5 === 0) {
      if (word.toLowerCase() === 'рубль') { // надо придумать как рубли отслеживать
        word = word.slice(0, -1)
        result += `${ word }ей`
        return result
      }
      result += `${ word }ов`
      return result
    }
    if (amount % 10 >= 2 && amount % 10 <= 4) {
      if (word.toLowerCase() === 'рубль') { // надо придумать как рубли отслеживать
        word = word.slice(0, -1)
        result += `${ word }я`
        return result
      }
      result += `${ word }а`
      return result
    }
    result += `${ word }`
    return result
  },

  /**
   *  Находит подстроку в строке назависимо от регистра
   */
  isStringIncluded(stringToTest, stringToSearch) {
    return stringToTest.toLowerCase()
      .trim()
      .includes(
        stringToSearch
          .toLowerCase()
          .trim()
      )
  },

  /**
   *  Генерирует уникальный id
   */
  uniqueId: (length = 16) => {
    return String(Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', ''))
  }
}
