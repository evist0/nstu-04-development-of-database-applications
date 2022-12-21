import { Meteor } from 'meteor/meteor'

import type { CreateUserPayload, User } from './types'

export function signUp(payload: CreateUserPayload): Promise<User> {
  return new Promise((resolve, reject) => {
    Meteor.call('createUserAsAdmin', payload, (error: unknown, response: User) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}
