import { Mongo } from 'meteor/mongo'
import type { UserProfile } from 'meteor/meteor'

import type { Tariff } from '/common/entities/tariffs'

export interface Account {
  _id?: string

  userProfile: UserProfile
  tariff: Tariff
}

export const AccountsCollection = new Mongo.Collection<Account>('accounts')
