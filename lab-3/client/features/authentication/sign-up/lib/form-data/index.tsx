import type { Dispatch, FC } from 'react'
import React, { createContext, useContext, useState } from 'react'

type Context = {
  values: unknown
  setValues: Dispatch<unknown>
}

const defaultContext: Context = { values: null, setValues: null } as unknown as Context
const FormContext = createContext<Context>(defaultContext)

const FormDataProvider: FC = ({ children }) => {
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
