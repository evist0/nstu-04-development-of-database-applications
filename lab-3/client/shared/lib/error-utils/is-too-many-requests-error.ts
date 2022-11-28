import { Meteor } from 'meteor/meteor'

const TOO_MANY_REQUESTS_ERROR = 'too-many-requests'

export const isTooManyRequestsError = (e: unknown) => {
  if (!(e instanceof Meteor.Error)) {
    return false
  }

  return e.error === TOO_MANY_REQUESTS_ERROR
}
