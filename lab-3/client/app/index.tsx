import { StrictMode } from 'react'

import { RouterProvider } from 'react-router-dom'

import { router } from './routing'

// TODO: withStrictMode HOC
export const App = () => (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
