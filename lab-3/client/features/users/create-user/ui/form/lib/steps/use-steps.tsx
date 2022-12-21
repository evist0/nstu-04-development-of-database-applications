import React, { useState } from 'react'

import type { Step, StepControls, UseStepResult } from './types'

export const useSteps = (stepsMap: Step[], onFinish: StepControls['onFinish']): UseStepResult => {
  const [step, setStep] = useState(0)

  const onNext = () => {
    if (step + 1 >= stepsMap.length) {
      return
    }

    setStep((step) => step + 1)
  }

  const onPrevious = () => {
    if (step - 1 < 0) {
      return
    }

    setStep((step) => step - 1)
  }

  const Component = stepsMap[step].content

  if (!Component) {
    throw Error(`Component is not defiened for step ${step}`)
  }

  const currentContent = <Component onNext={onNext} onPrevious={onPrevious} onFinish={onFinish} />

  return { step, setStep, currentContent }
}
