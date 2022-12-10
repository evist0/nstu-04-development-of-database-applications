import { TariffsCollection } from '/imports/entities/tariffs'

import Button from '@mui/material/Button'

import React from 'react'

const IndexPage = () => {
  const onAddTariff = () => {
    TariffsCollection.insert({ name: 'ЯП', term: 12, annual: 12 })
  }

  return (
    <>
      <h1>Hello from index page</h1>
      <Button onClick={onAddTariff}>Добавить</Button>
    </>
  )
}

export default IndexPage
