import React from 'react'

import type { DrawerProps } from '@mui/material/Drawer'
import MuiDrawer from '@mui/material/Drawer'

export const Drawer = (props: DrawerProps) => <MuiDrawer anchor={'left'} {...props}></MuiDrawer>
