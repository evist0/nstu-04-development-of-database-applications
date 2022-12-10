import { object, string } from 'yup'

export const schema = object({
  username: string().required(),
  email: string().required(),
  password: string().required(),
  profile: object({
    name: string().required(),
    surname: string().required(),
    patronymic: string().required(),
    phone: string().required(),
    passport: string().required(),
    address: string().required()
  })
})
