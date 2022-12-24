import type { FC } from 'react'
import React, { useState } from 'react'

import type { User } from '/client/shared/api'
import { Modal } from '/client/shared/ui/modal'

import EditIcon from '@mui/icons-material/Edit'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

import { UserEditForm } from './form'

type Props = { user: User } & Omit<IconButtonProps, 'onClick' | 'children'>

export const UserEditButton: FC<Props> = ({ user, ...restProps }) => {
  const [open, setOpen] = useState(false)

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <UserEditForm userId={user._id} profile={user.profile ?? {}} onSuccess={onClose} />
      </Modal>

      <IconButton onClick={onOpen} {...restProps}>
        <EditIcon />
      </IconButton>
    </>
  )
}
