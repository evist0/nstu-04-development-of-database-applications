import type { Dispatch, FC, ReactElement } from 'react'

export type Step = {
  label: string
  content: FC<StepControls>
}

export type StepControls = {
  onPrevious?: () => void
  onNext?: () => void
  onFinish?: (formData: Record<string, unknown>) => Promise<void> | void
}

export type UseStepResult = {
  step: number
  setStep: Dispatch<number>
  currentContent: ReactElement
}
