interface IBreadcrumb {
  level: number
  name: string
  href: string
  disabled: boolean
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
  IBreadcrumb,
  IconMap,
  IUser,
  IJWTCreate,
  ILoginForm,
  IRegistrationForm,
  IActivateAccount,
  IAuthError
}
