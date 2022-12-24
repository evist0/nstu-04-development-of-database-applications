import { Meteor } from 'meteor/meteor'

import type { Tariff } from './types'

export function createTariff(payload: Omit<Tariff, '_id'>) {
  return new Promise((resolve, reject) => {
    Meteor.call('createTariff', payload, (error: unknown, response: string) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}

export function updateTariff(payload: Tariff) {
  return new Promise((resolve, reject) => {
    Meteor.call('updateTariff', payload, (error: unknown, response: number) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}

export function removeTariff(tariffId: string) {
  return new Promise((resolve, reject) => {
    Meteor.call('removeTariff', tariffId, (error: unknown, response: number) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}
