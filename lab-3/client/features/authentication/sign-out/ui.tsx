import type { FC } from 'react'
import React from 'react'

import { signOut } from '/client/shared/api'

import LogoutIcon from '@mui/icons-material/Logout'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

type Props = Omit<IconButtonProps, 'onClick'>

export const SignOutButton: FC<Props> = (props) => {
  const onClick = async () => {
    await signOut()
  }

  return (
    <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={onClick} {...props}>
      <LogoutIcon />
    </IconButton>
  )
}
