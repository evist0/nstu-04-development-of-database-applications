import { TariffsCollection } from '/imports/entities/tariffs'

import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export interface Deposit {
  _id?: string
  userId: string
  tariffId: string
  createdAt: Date
  dueTo: Date
}

export const DepositsCollection = new Mongo.Collection<Deposit>('deposits')

DepositsCollection.addLinks({
  user: {
    type: 'one',
    collection: Meteor.users,
    field: 'userId'
  },
  tariff: {
    type: 'one',
    collection: TariffsCollection,
    field: 'tariffId'
  }
})

Meteor.users.addLinks({
  deposits: {
    collection: DepositsCollection,
    inversedBy: 'user'
  }
})
