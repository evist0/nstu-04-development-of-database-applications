import { Mongo } from 'meteor/mongo'

export interface Tariff {
  _id?: string
  name: string
  term: number
  annual: number
}

export const TariffsCollection = new Mongo.Collection<Tariff>('tariffs')
