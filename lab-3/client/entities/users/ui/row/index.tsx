import type { FC, ReactNode } from 'react'
import React from 'react'

import { UserDetailsPopup } from '/client/entities/users'
import type { User } from '/client/shared/api'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type Props = {
  user: User
  actions?: ReactNode
  modalContent?: ReactNode
}
export const UserRow: FC<Props> = ({ user, actions, modalContent }) => {
  const { profile: { surname, name, patronymic } = {}, username } = user

  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      <UserDetailsPopup user={user} modalContent={modalContent}>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography fontWeight={'500'}>{username}: </Typography>
          <Typography>
            {surname} {name} {patronymic}
          </Typography>
        </Stack>
      </UserDetailsPopup>
      {actions}
    </Stack>
  )
}
