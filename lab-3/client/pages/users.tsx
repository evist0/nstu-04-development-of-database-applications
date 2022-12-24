import React from 'react'

import { DepositRow } from '/client/entities/deposits'
import { UserRow, useUsers } from '/client/entities/users'
import { useViewer } from '/client/entities/viewer'
import { DepositCreateButton } from '/client/features/deposit-create'
import { UserCreateButton } from '/client/features/user-create'
import { UserEditButton } from '/client/features/user-edit'
import { UserRemoveButton } from '/client/features/user-remove'
import type { Deposit, User } from '/client/shared/api'

import { DepositsCollection } from '/imports/entities/deposit'
import { RolesEnum } from '/imports/entities/roles'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTracker } from 'meteor/react-meteor-data'

const LocalUserRow = ({ user, isAdmin }: { user: User; isAdmin: boolean }) => {
  const userDeposits = useTracker(() => DepositsCollection.find({ userId: user._id }).fetch() as unknown as Deposit[])

  return (
    <UserRow
      key={user._id}
      user={user}
      modalContent={
        <Stack spacing={2} mt={2}>
          <Typography fontWeight={500} fontSize={18}>
            Счета:
          </Typography>

          {userDeposits.length < 1 && <Typography>У пользователя отсутствуют счета</Typography>}

          {userDeposits.length >= 1 &&
            userDeposits.map((deposit: Deposit) => <DepositRow key={deposit._id} deposit={deposit} />)}

          <DepositCreateButton sx={{ margin: 'auto' }} user={user}>
            + Открыть счёт
          </DepositCreateButton>
        </Stack>
      }
      actions={
        <Stack direction={'row'}>
          {isAdmin && <UserEditButton user={user} />}
          {isAdmin && <UserRemoveButton userId={user._id} />}
        </Stack>
      }
    />
  )
}

const UsersPage = () => {
  const viewer = useViewer() as User
  const users = useUsers()

  const isAdmin = Roles.userIsInRole(viewer._id, RolesEnum.Admin)

  return (
    <Stack direction={'column'} spacing={2}>
      {users?.map((user) => (
        <LocalUserRow key={user._id} user={user} isAdmin={isAdmin} />
      ))}

      {isAdmin && <UserCreateButton>+ Создать пользователя</UserCreateButton>}
    </Stack>
  )
}

export default UsersPage
