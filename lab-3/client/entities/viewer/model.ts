import type { User } from '/client/shared/api'

import { useTracker } from 'meteor/react-meteor-data'

export const useViewerId = (): string | null => useTracker(() => Meteor.userId(), [])

type Options = { fields?: Mongo.FieldSpecifier }
export const useViewer = (options?: Options): User | null => useTracker(() => Meteor.user(options) as User, [])
