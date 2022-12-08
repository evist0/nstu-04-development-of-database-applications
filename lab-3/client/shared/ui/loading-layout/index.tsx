import React from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const LoadingLayout = () => (
  <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
    <CircularProgress sx={{ margin: 'auto' }} />
  </Box>
)
