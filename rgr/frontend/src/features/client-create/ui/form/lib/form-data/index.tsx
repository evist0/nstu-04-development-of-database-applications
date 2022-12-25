import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'

import type { CreateClientPayload } from 'shared/api/types'

type Context<T = never> = {
  values: T
  setValues: (values: unknown) => Record<string, unknown>
}

const defaultContext = { values: null, setValues: null } as unknown as Context<Partial<CreateClientPayload>>
const FormContext = createContext<Context<Partial<CreateClientPayload>>>(defaultContext)

const FormDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState({})

  const setValues = (values: unknown): Record<string, unknown> => {
    if (!values || typeof values !== 'object' || values instanceof Array) {
      return data
    }

    let newValues = {}
    setData((prevValues) => {
      newValues = { ...prevValues, ...values }
      return newValues
    })

    return newValues
  }

  return <FormContext.Provider value={{ values: data, setValues }}>{children}</FormContext.Provider>
}

export const withFormDataProvider = (Component: FC) => {
  const WrappedComponent = (props: unknown) => {
    if (typeof props !== 'object') {
      throw Error('Props is not an object')
    }

    return (
      <FormDataProvider>
        <Component {...props} />
      </FormDataProvider>
    )
  }
  WrappedComponent.displayName = 'withFormData'

  return WrappedComponent
}

export const useFormData = () => useContext(FormContext)
