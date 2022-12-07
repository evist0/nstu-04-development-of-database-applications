import type { User } from '/client/shared/api'

import { useTracker } from 'meteor/react-meteor-data'

export const useViewerId = (): string | null => useTracker(() => Meteor.userId(), [])
export const useViewer = (): User | null => useTracker(() => Meteor.user(), [])
