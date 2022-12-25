import type { FC } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'

export const MenuButton: FC<IconButtonProps> = (props) => (
  <IconButton size="large" edge="start" color="inherit" aria-label="menu" {...props}>
    <MenuIcon />
  </IconButton>
)
