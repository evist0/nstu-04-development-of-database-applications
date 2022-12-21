import type { Meteor } from 'meteor/meteor'

export type User = Meteor.User

export type CreateUserPayload = {
  username: string
  email: string
  password: string
  profile?: User['profile']
}
