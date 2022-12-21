import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import React, { createContext, useContext, useState } from 'react'

import type { CreateUserPayload } from '/client/shared/api'

type Context<T = never> = {
  values: T
  setValues: Dispatch<SetStateAction<T>>
}

const defaultContext = { values: null, setValues: null } as unknown as Context<Partial<CreateUserPayload>>
const FormContext = createContext<Context<Partial<CreateUserPayload>>>(defaultContext)

const FormDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState({})

  const setValues = (values: unknown) => {
    if (!values || typeof values !== 'object' || values instanceof Array) {
      return
    }

    setData((prevValues) => ({
      ...prevValues,
      ...values
    }))
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
