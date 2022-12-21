import React from 'react'

import { UserDetailsPopup, UserRow, useUsers } from '/client/entities/users'
import { CreateUserButton } from '/client/features/users/create-user'

import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

const UsersPage = () => {
  const users = useUsers()

  return (
    <Stack direction={'column'} spacing={2}>
      {users?.map((user) => (
        <UserRow
          key={user._id}
          user={user}
          actions={
            <Stack direction={'row'} spacing={2}>
              <UserDetailsPopup user={user}>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </UserDetailsPopup>
            </Stack>
          }
        />
      ))}

      <CreateUserButton>+ Создать пользователя</CreateUserButton>
    </Stack>
  )
}

export default UsersPage
