import type { Step } from '../lib'
import { ContactInfoStep } from '../steps'

export const STEPS: Step[] = [
  {
    label: 'Контактная информация',
    content: ContactInfoStep
  }
]
