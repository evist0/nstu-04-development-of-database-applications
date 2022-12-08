import type { Meteor } from 'meteor/meteor'

export type User = Meteor.User
export type CreateUser = {
  username: string
  email: string
  password: string
  profile?: User['profile']
}
