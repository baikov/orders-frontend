interface IMenuItem {
  id: number
  name: string
  depth: number
  slug: string
  image?: string | null
  submenu: IMenuItem[] | []
}
interface IBreadcrumb {
  level: number
  name: string
  href: string
  disabled: boolean
}
interface ISEO {
  seo_title: string
  seo_description: string
  h1: string
  is_index: boolean
  is_follow: boolean
}
interface ICategory {
  id: number
  name: string
  slug: string
  image: string | null
  // parents: string[]
  description: string
}
interface IProductProperty {
  id: number
  name: string
  code: string
  units: string
  is_display_in_list: boolean
  ordering: number
}
interface ICategoryDetail {
  id: number
  name: string
  slug: string
  seo: ISEO
  description: string
  breadcrumbs: IBreadcrumb[]
  product_properties: IProductProperty[]
  subcategories: ICategory[] | []
}
interface IProductPropertyValue extends IProductProperty {
  value: string
}
interface IProduct {
  id: number
  name: string
  slug: string
  properties: IProductPropertyValue[]
  unit_price_with_coef: number
  ton_price_with_coef: number | string
  meter_price_with_coef: number
  seo: ISEO
  category: string
  description: string
  breadcrumbs: IBreadcrumb[]
  in_stock: boolean
}
interface IProductList {
  limit: number
  offset: number
  count: number
  next: string | null
  previous: string | null
  results: IProduct[]
}

interface IconMap {
  [key: string]: string
}

interface IUser {
  id: number | null
  username: string
  email: string
}

interface IJWTCreate {
  access: string
  refresh: string
}

interface ILoginForm {
  username: string | undefined
  password: string | undefined
}

interface IRegistrationForm extends ILoginForm {
  email: string | undefined
  re_password: string | undefined
  name: string | undefined
}

interface IActivateAccount {
  uid: string
  token: string
}

interface IAuthError {
  code: string | number | null
  message: string[] | null
}

export type {
  IMenuItem,
  ICategory,
  IProduct,
  IBreadcrumb,
  ICategoryDetail,
  IProductList,
  IProductProperty,
  IProductPropertyValue,
  IconMap,
  IUser,
  IJWTCreate,
  ILoginForm,
  IRegistrationForm,
  IActivateAccount,
  IAuthError
}
