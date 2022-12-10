import { useState } from 'react'

import type { Step, UseStepResult } from './types'

export const useSteps = (stepsMap: Step[], onFinish: () => void): UseStepResult => {
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

  const currentContent = stepsMap[step].content({ onNext, onPrevious, onFinish })

  return { step, setStep, currentContent }
}
