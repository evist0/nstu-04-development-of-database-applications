declare module 'meteor/meteor' {
  interface UserProfile {
    name: string
    surname: string
    patronymic: string

    passport: string
    address: string
    phone: string
  }
}
