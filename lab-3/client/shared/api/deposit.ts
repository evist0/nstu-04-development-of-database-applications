import type { CreateDepositPayload } from '/client/shared/api/types'

import { Meteor } from 'meteor/meteor'

export function createDeposit(payload: CreateDepositPayload) {
  return new Promise((resolve, reject) => {
    Meteor.call('createDeposit', payload, (error: unknown, response: string) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}
