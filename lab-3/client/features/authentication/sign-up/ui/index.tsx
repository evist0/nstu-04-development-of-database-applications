import type { FC } from 'react'
import React from 'react'

import type { User } from '/client/shared/api'

import Box from '@mui/material/Box'
import MuiStep from '@mui/material/Step'
import MuiStepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

import type { Step } from '../lib'
import { withFormDataProvider, useSteps } from '../lib'
import { STEPS } from '../model'

type Props = {
  onSuccess?: (user: User) => void
}

const SignUpFormBase: FC<Props> = ({ onSuccess }) => {
  const onFinish = () => {
    if (onSuccess) {
      // onSuccess(null as unknown as User)
    }

    // eslint-disable-next-line no-console
    console.log('Submit')
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

export const SignUpForm = withFormDataProvider(SignUpFormBase)
