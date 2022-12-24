import type { Tariff } from '/client/shared/api'

import { TariffsCollection } from '/imports/entities/tariffs'

import { useTracker } from 'meteor/react-meteor-data'

export const useTariffs: () => Tariff[] = () =>
  useTracker(() => TariffsCollection.find().fetch(), []) as unknown as Tariff[]
