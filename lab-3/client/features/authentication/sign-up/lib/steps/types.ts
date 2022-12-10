import type { Dispatch, ReactNode } from 'react'

export type Step = {
  label: string
  content: (controls: StepControls) => ReactNode
}

export type StepControls = {
  onPrevious?: () => void
  onNext?: () => void
  onFinish?: () => void
}

export type UseStepResult = {
  step: number
  setStep: Dispatch<number>
  currentContent: ReactNode
}
