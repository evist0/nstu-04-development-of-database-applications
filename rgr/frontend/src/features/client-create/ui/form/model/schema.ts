import { object, string } from 'yup'

export const schema = object({
  name: string().required(),
  surname: string().required(),
  patronymic: string().required(),
  phone: string().required(),
  passport: string().required(),
  address: string().required()
})
