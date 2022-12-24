import type { Meteor } from 'meteor/meteor'

export type User = Meteor.User

export type UserProfile = Meteor.UserProfile

export type CreateUserPayload = {
  username: string
  email: string
  password: string
  profile: User['profile']
}

export type Tariff = {
  _id: string
  name: string
  term: number
  annual: number
}

export type Deposit = {
  _id: string
  userId: string
  tariffId: string
  createdAt: Date
  dueTo: Date
}

export type CreateDepositPayload = {
  userId: string
  tariffId: string
}
