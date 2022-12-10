import React from 'react'

import { App } from '/client/app'

import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { createRoot } from 'react-dom/client'

Meteor.startup(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('roleAssignment')
    Meteor.subscribe('roles')
  })

  const target = document.getElementById('react-target')

  if (!target) {
    throw Error('div#react-target was not found')
  }

  const root = createRoot(target)
  root.render(<App />)
})
