export type THeaderNavDropdownItem = {
  title: string,
  routeName?: string,
  icon?: string,
  href?: string,
  onClick?: unknown,
}

export type THeaderNavItem = {
  title: string,
  routeName?: string,
  dropdownItems?: THeaderNavDropdownItem[],
  mobileMenuIcon?: string
  isLoggedIn?: boolean,
  onClick?: unknown,
  isAccount?: boolean,
}
