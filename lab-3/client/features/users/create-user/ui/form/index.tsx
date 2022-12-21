import type { FC } from 'react'
import React from 'react'

import type { User } from '/client/shared/api'
import { signUp } from '/client/shared/api'

import Box from '@mui/material/Box'
import MuiStep from '@mui/material/Step'
import MuiStepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

import type { Step } from './lib'
import { useFormData, useSteps, withFormDataProvider } from './lib'
import { schema, STEPS } from './model'

type Props = {
  onSuccess?: (user: User) => Promise<void> | void
}

const CreateUserFormBase: FC<Props> = ({ onSuccess }) => {
  const { values } = useFormData()

  const onFinish = async () => {
    try {
      console.log(values)

      const payload = await schema.validate(values)
      const user = await signUp(payload)

      if (onSuccess) {
        onSuccess(user)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const { step, currentContent } = useSteps(STEPS, onFinish)

  const getStepLabels = (steps: Step[]) =>
    steps.map(({ label }) => (
      <MuiStep key={label}>
        <MuiStepLabel>{label}</MuiStepLabel>
      </MuiStep>
    ))

  return (
    <Box width={'100%'}>
      <Stepper activeStep={step}>{getStepLabels(STEPS)}</Stepper>
      <Box mt={4}>{currentContent}</Box>
    </Box>
  )
}

export const CreateUserForm: FC<Props> = withFormDataProvider(CreateUserFormBase)
