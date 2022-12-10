import { RolesEnum } from '/imports/entities/roles'

import Button from '@mui/material/Button'

import React from 'react'

const RolesPage = () => {
  const onClick = () => {
    Roles.addUsersToRoles('kGgcG9STpXumAJKG6', [RolesEnum.Admin])
  }

  return (
    <>
      <h1>Hello from roles page</h1>

      <Button onClick={onClick}>Promote evist0</Button>
    </>
  )
}

export default RolesPage
