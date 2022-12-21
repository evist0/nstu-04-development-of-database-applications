import type { User } from '/client/shared/api'

import { useTracker } from 'meteor/react-meteor-data'

export const useUsers: () => User[] = () => useTracker(() => Meteor.users.find().fetch(), []) as unknown as User[]
