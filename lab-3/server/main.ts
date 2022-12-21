import { RolesEnum } from '/imports/entities/roles'

import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

import UserProfile = Meteor.UserProfile

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '123456As'

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(ADMIN_USERNAME)) {
    Accounts.createUser({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    })
  }

  const admin = Accounts.findUserByUsername(ADMIN_USERNAME) as Meteor.User

  if (!Roles.userIsInRole(admin._id, RolesEnum.Admin)) {
    Roles.addUsersToRoles(admin._id, RolesEnum.Admin)
  }
})

Meteor.methods({
  createUserAsAdmin(user: { username: string; email: string; password: string; profile: UserProfile }) {
    if (!this.userId) {
      throw new Error('401')
    }

    const isAdmin = Roles.userIsInRole(this.userId, RolesEnum.Admin)

    if (!isAdmin) {
      throw new Error('403')
    }

    const id = Accounts.createUser(user)
    return Meteor.users.find({ _id: id }).fetch()[0]
  }
})

Meteor.publish('roles', function () {
  return Meteor.roles.find()
})

Meteor.publish('roleAssignment', function () {
  if (!this.userId) {
    this.ready()
    return
  }

  return Meteor.roleAssignment.find({ 'user._id': this.userId })
})

Meteor.publish('userData', function () {
  if (!this.userId) {
    this.ready()
    return
  }

  const isAdmin = Roles.userIsInRole(this.userId, RolesEnum.Admin)
  const opts = { fields: { username: 1, emails: 1, profile: 1 } }

  if (isAdmin) {
    return Meteor.users.find({}, opts)
  }

  return Meteor.users.find({ _id: this.userId }, opts)
})

Accounts.onCreateUser(({ profile }, user: Meteor.User) => {
  user._id = Random.id()
  user.profile = profile as Meteor.UserProfile

  Roles.addUsersToRoles(user._id, RolesEnum.User)

  return user
})

Meteor.users.helpers({
  editableBy(userId) {
    if (!this._id || !userId) {
      return false
    }

    // User can be edited by itself or by admin
    return userId === this._id || Roles.userIsInRole(userId, RolesEnum.Admin)
  }
})
