import type { Step } from '../lib'
import { ContactInfoStep, CredentialsStep } from '../steps'

export const STEPS: Step[] = [
  {
    label: 'Учетные данные',
    content: CredentialsStep
  },
  {
    label: 'Контактная информация',
    content: ContactInfoStep
  }
]
