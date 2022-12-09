import { RolesEnum } from '/common/entities/roles'

import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

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
  setUserRole() {
    console.log('setUserRole')
  }
})

Meteor.publish('roleAssignment', function () {
  if (!this.userId) {
    return this.ready()
  }

  return Meteor.roleAssignment.find({ 'user._id': this.userId })
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
