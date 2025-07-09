'use client'

import { Environment } from '@axium/database/types'
import React from 'react'

type EnvironmentContextValue = {
  currentEnvironment: string
  setCurrentEnvironmentId: (id: string | 'all') => void
  environments: Environment[]
}

const EnvironmentContext = React.createContext<EnvironmentContextValue | null>(
  null,
)

type Props = {
  children: React.ReactNode
  environments: Environment[]
}

export default function EnvironmentProvider({ children, environments }: Props) {
  const [currentEnvironmentId, setCurrentEnvironmentId] =
    React.useState<string>('all')

  const contextValue = React.useMemo(() => {
    return {
      currentEnvironment: currentEnvironmentId,
      setCurrentEnvironmentId,
      environments,
    }
  }, [currentEnvironmentId, environments])

  return (
    <EnvironmentContext.Provider value={contextValue}>
      {children}
    </EnvironmentContext.Provider>
  )
}

export function useEnvironment(): EnvironmentContextValue {
  const context = React.useContext(EnvironmentContext)

  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }

  return context
}
