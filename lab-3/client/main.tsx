import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'

import { App } from '/client/app'

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'))
})
