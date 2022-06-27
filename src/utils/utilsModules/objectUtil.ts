import { IStringObject, ISelectItem } from '@/models/breadcrumbs'

export interface IStringObjectUtil {
  convertToSelectArray: (obj: IStringObject) => ISelectItem[],
  fillSameFields: (objToFill: Record<string, unknown>, objFiller: Record<string, unknown>) => void
}

export const objectUtil: IStringObjectUtil = {
  /**
   * Конвертирует объект в массив для селекта
   */
  convertToSelectArray(obj) {
    return (
      Object.entries(obj)
        .map(([key, value]: [string, string]): ISelectItem => {
          return {
            label: value,
            value: key,
          } as ISelectItem
        })
    )
  },
  /**
   * Копирует значения одинаковых полей из объекта заполнителя objFiller в принимающий объект objToFill
   */
  fillSameFields(objToFill, objFiller) {
    Object.entries(objFiller)
      .forEach(([key, value]: [string, unknown]): void => {
        if (objToFill[key] !== null && objToFill[key] !== undefined && value !== null) {
          objToFill[key] = value
        }
      })
  }
}
