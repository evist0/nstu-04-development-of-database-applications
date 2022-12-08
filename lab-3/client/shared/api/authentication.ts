import { Meteor } from 'meteor/meteor'

import type { CreateUser, User } from './types'

export function signIn(username: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        reject(error)
      }

      const user = Meteor.user() as Meteor.User
      resolve(user)
    })
  })
}

export function signUp(payload: CreateUser): Promise<User> {
  return new Promise((resolve, reject) => {
    Accounts.createUser(payload, (error) => {
      if (error) {
        reject(error)
      }

      const user = Meteor.user() as Meteor.User
      resolve(user)
    })
  })
}

export function signOut(): Promise<void> {
  return new Promise((resolve, reject) => {
    Meteor.logout((error) => {
      if (error) {
        reject(error)
      }

      resolve()
    })
  })
}
