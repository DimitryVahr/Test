export interface ISelectItem {
  label: string,
  value?: string | number
  selected?: boolean
  hidden?: boolean
}

export interface IStringObject {
  [key: string]: string
}
