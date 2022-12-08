import React, { useState } from 'react'
import type { ReactNode, FC } from 'react'

import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { Drawer } from './ui/drawer'
import { Header } from './ui/header'
import { MenuButton } from './ui/menu-button'

type Props = {
  children?: ReactNode
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  const [menuOpened, setMenuOpened] = useState(false)

  const onToggle = () => {
    setMenuOpened((opened) => !opened)
  }

  const onClose = () => {
    setMenuOpened(false)
  }

  const ButtonAndLogo = () => (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <MenuButton onClick={onToggle} />
      <Typography>Tankoff Bank</Typography>
    </Stack>
  )

  return (
    <>
      <Header>
        <ButtonAndLogo />
      </Header>
      <Drawer open={menuOpened} onClose={onClose}>
        <Toolbar>
          <ButtonAndLogo />
        </Toolbar>
        <Divider />
      </Drawer>

      {children}
    </>
  )
}
