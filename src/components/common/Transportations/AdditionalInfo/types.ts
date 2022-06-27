export interface IAdditionalInfoCard {
  icon: string,
  title: string,
  text: string[],
  button?: string,
  link?: {
    text: string,
    href?: string,
    routeName?: string
  },
}
