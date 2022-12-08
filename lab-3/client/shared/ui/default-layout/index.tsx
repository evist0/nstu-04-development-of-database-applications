import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'

import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { Drawer } from './ui/drawer'
import { Header } from './ui/header'
import { MenuButton } from './ui/menu-button'

type Props = {
  profile?: ReactNode
  children?: ReactNode
}

export const DefaultLayout: FC<Props> = ({ children, profile }) => {
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
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
          <ButtonAndLogo />
          {profile}
        </Stack>
      </Header>
      <Drawer open={menuOpened} onClose={onClose}>
        <Toolbar>
          <ButtonAndLogo />
        </Toolbar>
        <Divider />
      </Drawer>

      <Container>
        <Toolbar />
        {children}
      </Container>
    </>
  )
}
