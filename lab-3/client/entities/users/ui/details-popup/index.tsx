import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'

import type { User } from '/client/shared/api'
import { Modal } from '/client/shared/ui/modal'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Meteor } from 'meteor/meteor'

import UserProfile = Meteor.UserProfile

type Props = {
  user: User
  children: ReactNode
}

export const UserDetailsPopup: FC<Props> = ({ user, children }) => {
  const [open, setOpen] = useState(false)
  const profile: UserProfile | undefined = user.profile

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const fio = `${profile?.surname} ${profile?.name} ${profile?.patronymic}`

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Typography variant="h6" component="h2">
          {fio.length > 2 ? fio : '<ФИО отсутствует>'}
        </Typography>

        <Box mt={2}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography fontWeight={500}>Паспорт:</Typography>
            <Typography>{profile?.passport}</Typography>
          </Stack>

          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography fontWeight={500}>Телефон:</Typography>
            <Typography>{profile?.phone}</Typography>
          </Stack>

          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography fontWeight={500}>Адрес:</Typography>
            <Typography>{profile?.address}</Typography>
          </Stack>
        </Box>
      </Modal>

      <Box onClick={onOpen}>{children}</Box>
    </>
  )
}
