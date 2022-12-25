import type { FC, ReactNode } from 'react'
import { useState } from 'react'

import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

import type { Navigation } from './model'
import { Drawer } from './ui/drawer'
import { Header } from './ui/header'
import { MenuButton } from './ui/menu-button'

type Props = {
  profile?: ReactNode
  children?: ReactNode
  navigation?: Navigation[]
}

export const DefaultLayout: FC<Props> = ({ children, profile, navigation }) => {
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
        <List>
          {navigation?.map(({ path, name }, index) => (
            <Link to={path} key={index} onClick={onClose}>
              <ListItem>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Container maxWidth="xl">
        <Toolbar />

        <Stack mt={4} alignItems={'center'}>
          {children}
        </Stack>
      </Container>
    </>
  )
}

export type { Navigation }
