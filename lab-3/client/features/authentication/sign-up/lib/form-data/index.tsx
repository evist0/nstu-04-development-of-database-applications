import type { Dispatch, FC, PropsWithChildren } from 'react'
import React, { createContext, useContext, useState } from 'react'

import type { SignUpPayload } from '/client/shared/api'

type Context<T = never> = {
  values: T
  setValues: Dispatch<T>
}

const defaultContext = { values: null, setValues: null } as unknown as Context<Partial<SignUpPayload>>
const FormContext = createContext<Context<Partial<SignUpPayload>>>(defaultContext)

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
