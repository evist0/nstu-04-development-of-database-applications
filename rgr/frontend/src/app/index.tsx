import { StrictMode } from 'react'

import { RouterProvider } from 'react-router-dom'

import { router } from './routing'

export const App = () => (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
