import { RolesEnum } from '/common/entities/roles'

import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

import User = Meteor.User

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '123456As'

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(ADMIN_USERNAME)) {
    Accounts.createUser({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    })
  }

  const admin = Accounts.findUserByUsername(ADMIN_USERNAME) as User

  if (!Roles.userIsInRole(admin._id, RolesEnum.Admin)) {
    Roles.addUsersToRoles(admin._id, RolesEnum.Admin)
  }
})

Meteor.publish(null, function () {
  if (!this.userId) {
    return this.ready()
  }

  const canAccessAllRoles = Roles.userIsInRole(this.userId, RolesEnum.Admin)

  if (canAccessAllRoles) {
    return Meteor.roleAssignment.find()
  }

  return Meteor.roleAssignment.find({ 'user._id': this.userId })
})

Meteor.publish('roles', function () {
  if (!this.userId) {
    return this.ready()
  }

  const canAccessAllRoles = Roles.userIsInRole(this.userId, RolesEnum.Admin)

  if (!canAccessAllRoles) {
    return this.ready()
  }

  return Meteor.roles.find()
})

Accounts.onCreateUser((_, user) => {
  user._id = Random.id()

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
