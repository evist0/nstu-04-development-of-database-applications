import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

import type { Tariff } from '/common/entities/tariffs'

import UserProfile = Meteor.UserProfile

export interface Account {
  _id?: string

  userProfile: UserProfile
  tariff: Tariff
}

export const AccountsCollection = new Mongo.Collection<Account>('accounts')

AccountsCollection.addLinks({
  list: {
    type: 'one',
    field: 'listId',
    collection: Meteor.users
  }
})
