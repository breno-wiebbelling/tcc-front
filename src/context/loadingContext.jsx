import * as React from 'react'
import { useLoading } from '../customHooks/useLoading'

const LoadingContext = React.createContext()

export function LoadingProvider({ children }) {
  const loading = useLoading()

  return <LoadingContext.Provider value={loading}>{children}</LoadingContext.Provider>
}

export const LoadingConsumer = () => React.useContext(LoadingContext)