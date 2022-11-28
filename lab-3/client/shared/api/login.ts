import { Meteor } from 'meteor/meteor'

export function login(username: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        reject(error)
      }

      resolve()
    })
  })
}
