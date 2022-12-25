import Stack from '@mui/material/Stack'

import { TariffRow, useTariffs } from 'entities/tariffs'
import { TariffCreateButton } from 'features/tariff-create'
import { TariffEditButton } from 'features/tariff-edit'
import { TariffRemoveButton } from 'features/tariff-remove'

const TariffsPage = () => {
  const { data, isLoading } = useTariffs()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Stack direction={'column'} spacing={2}>
      {data?.tariffs.map((tariff) => (
        <TariffRow
          key={tariff.id}
          tariff={tariff}
          actions={
            <Stack direction={'row'}>
              <TariffEditButton tariff={tariff} />
              <TariffRemoveButton tariffId={tariff.id} />
            </Stack>
          }
        />
      ))}

      <TariffCreateButton>+ Создать тариф</TariffCreateButton>
    </Stack>
  )
}

export default TariffsPage
