import React from 'react'

import { App } from '/client/app'

import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { render } from 'react-dom'

Meteor.startup(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('roleAssignment')
    Meteor.subscribe('roles')
  })

  render(<App />, document.getElementById('react-target'))
})
