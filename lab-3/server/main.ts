import { DepositsCollection } from '/imports/entities/deposit'
import { RolesEnum } from '/imports/entities/roles'
import type { Tariff } from '/imports/entities/tariffs'
import { TariffsCollection } from '/imports/entities/tariffs'

import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

import UserProfile = Meteor.UserProfile

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '123456As'

const AVAILABLE_ROLES = [RolesEnum.Admin, RolesEnum.User]

Meteor.startup(async () => {
  const databaseRoles = Roles.getAllRoles().fetch()

  AVAILABLE_ROLES.forEach((role) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isExists = databaseRoles.find((dbRole) => dbRole._id === role) !== undefined

    if (!isExists) {
      Roles.createRole(role)
    }
  })

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
  },
  updateUserProfile(payload: { id: string } & UserProfile) {
    if (!this.userId) {
      throw new Error('401')
    }

    const isAdmin = Roles.userIsInRole(this.userId, RolesEnum.Admin)

    if (!isAdmin) {
      throw new Error('403')
    }

    const { id, ...profile } = payload
    return Meteor.users.update({ _id: id }, { $set: { profile } })
  },
  removeUser(userId: string) {
    if (!this.userId) {
      throw new Error('401')
    }

    const isAdmin = Roles.userIsInRole(this.userId, RolesEnum.Admin)

    if (!isAdmin) {
      throw new Error('403')
    }

    return Meteor.users.remove({ _id: userId })
  },
  createTariff(tariff: { name: string; annual: number; term: number }) {
    if (!this.userId) {
      throw new Error('401')
    }

    return TariffsCollection.insert(tariff)
  },
  updateTariff(tariff: Tariff) {
    if (!this.userId) {
      throw new Error('401')
    }

    const { _id, ...payload } = tariff
    return TariffsCollection.update({ _id }, { $set: { ...payload } })
  },
  removeTariff(tariffId: string) {
    if (!this.userId) {
      throw new Error('401')
    }

    return TariffsCollection.remove({ _id: tariffId })
  },
  createDeposit(payload: { tariffId: string; userId: string }) {
    if (!this.userId) {
      throw new Error('401')
    }

    const tariff = TariffsCollection.findOne({ _id: payload.tariffId })

    if (!tariff) {
      throw new Error('Tariff not found')
    }

    const createdAt = new Date()

    const dueTo = new Date()
    dueTo.setMonth(dueTo.getMonth() + tariff.term)

    return DepositsCollection.insert({ ...payload, createdAt, dueTo })
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

Meteor.publish('users', function () {
  if (!this.userId) {
    this.ready()
    return
  }

  const opts = { fields: { username: 1, emails: 1, profile: 1 } }
  return Meteor.users.find({}, opts)
})

Meteor.publish('tariffs', function () {
  if (!this.userId) {
    this.ready()
    return
  }

  return TariffsCollection.find({})
})

Meteor.publish('deposits', function () {
  if (!this.userId) {
    this.ready()
    return
  }

  return DepositsCollection.find({})
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
