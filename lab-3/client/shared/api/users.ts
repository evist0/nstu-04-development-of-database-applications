import { Meteor } from 'meteor/meteor'

import type { CreateUserPayload, User, UserProfile } from './types'

export function createUser(payload: CreateUserPayload): Promise<User> {
  return new Promise((resolve, reject) => {
    Meteor.call('createUserAsAdmin', payload, (error: unknown, response: User) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}

export function updateUserProfile(payload: { id: string } & UserProfile) {
  return new Promise((resolve, reject) => {
    Meteor.call('updateUserProfile', payload, (error: unknown, response: number) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}

export function removeUser(userId: string) {
  return new Promise((resolve, reject) => {
    Meteor.call('removeUser', userId, (error: unknown, response: number) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}
