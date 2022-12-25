import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AccountRow } from 'entities/accounts'
import { ClientRow, useClients } from 'entities/clients'
import { AccountCreateButton } from 'features/account-create'
import { ClientCreateButton } from 'features/client-create'
import { ClientEditButton } from 'features/client-edit'
import { ClientRemoveButton } from 'features/client-remove'
import type { Account, Client } from 'shared/api/types'

import { AccountRemoveButton } from '../features/account-delete'

const LocalClientRow = ({ client }: { client: Client }) => {
  const modalContent = (fetchedClient: Client) => (
    <Stack spacing={2} mt={2}>
      <Typography fontWeight={500} fontSize={18}>
        Счета:
      </Typography>

      {!fetchedClient.accounts ||
        (fetchedClient.accounts.length < 1 && <Typography>У пользователя отсутствуют счета</Typography>)}

      {fetchedClient.accounts?.length >= 1 &&
        fetchedClient.accounts.map((account: Account) => (
          <AccountRow
            key={account.id}
            account={account}
            actions={<AccountRemoveButton clientId={client.id} accountId={account.id} />}
          />
        ))}

      <AccountCreateButton sx={{ margin: 'auto' }} client={client}>
        + Открыть счёт
      </AccountCreateButton>
    </Stack>
  )

  return (
    <ClientRow
      key={client.id}
      client={client}
      modalContent={modalContent}
      actions={
        <Stack direction={'row'}>
          <ClientEditButton client={client} />
          <ClientRemoveButton clientId={client.id} />
        </Stack>
      }
    />
  )
}

const ClientsPage = () => {
  const { data, isLoading } = useClients()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Stack direction={'column'} spacing={2}>
      {data?.clients.map((client) => (
        <LocalClientRow key={client.id} client={client} />
      ))}

      <ClientCreateButton>+ Создать пользователя</ClientCreateButton>
    </Stack>
  )
}

export default ClientsPage
