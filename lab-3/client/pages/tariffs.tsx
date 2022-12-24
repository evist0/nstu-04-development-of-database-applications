import React from 'react'

import { TariffRow, useTariffs } from '/client/entities/tariffs'
import { TariffCreateButton } from '/client/features/tariff-create'
import { TariffEditButton } from '/client/features/tariff-edit'
import { TariffRemoveButton } from '/client/features/tariff-remove'

import Stack from '@mui/material/Stack'

const TariffsPage = () => {
  const tariffs = useTariffs()

  return (
    <Stack direction={'column'} spacing={2}>
      {tariffs?.map((tariff) => (
        <TariffRow
          key={tariff._id}
          tariff={tariff}
          actions={
            <Stack direction={'row'}>
              <TariffEditButton tariff={tariff} />
              <TariffRemoveButton tariffId={tariff._id} />
            </Stack>
          }
        />
      ))}

      <TariffCreateButton>+ Создать тариф</TariffCreateButton>
    </Stack>
  )
}

export default TariffsPage
