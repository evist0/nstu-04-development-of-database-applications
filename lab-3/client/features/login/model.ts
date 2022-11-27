import { yupResolver } from '@hookform/resolvers/yup';
import { Meteor } from 'meteor/meteor'
import yup, { InferType } from 'yup'

export const FIELD_NAME_USERNAME = 'username'
export const FIELD_NAME_PASSWORD = 'password'

const schema = yup.object({
  [FIELD_NAME_USERNAME]: yup.string().required('Введите имя пользователя'),
  [FIELD_NAME_PASSWORD]: yup.string().required('Введите пароль')
})

export type LoginData = InferType<typeof schema>

export const defaultValues: LoginData = {
  [FIELD_NAME_USERNAME]: '',
  [FIELD_NAME_PASSWORD]: ''
}

export const resolver = yupResolver(schema)

export function login(username: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        reject(error);
      }

      resolve()
    })
  })
}