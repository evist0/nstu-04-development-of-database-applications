import type { FC, PropsWithChildren } from 'react'
import React from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

export const Header: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <AppBar position="fixed">
    <Toolbar>{children}</Toolbar>
  </AppBar>
)
