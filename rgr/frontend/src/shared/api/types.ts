export type Tariff = {
  id: string
  name: string
  term: number
  annual: number
}

export type Account = {
  id: string
  tariff: Tariff
  createdAt: string
  dueTo: string
}

export type Client = {
  id: string
  name: string
  surname: string
  patronymic: string
  passport: string
  phone: string
  address: string
  accounts: Account[]
}

export type GetTariffsResult = {
  tariffs: Tariff[]
}
