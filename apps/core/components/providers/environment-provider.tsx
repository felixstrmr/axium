'use client'

import { useQueryState } from 'nuqs'
import React from 'react'
import type { Environment } from '@/types'

type EnvironmentContextValue = {
  currentEnvironmentId: string
  setCurrentEnvironmentId: (id: string) => void
  environments: Environment[]
}

const EnvironmentContext = React.createContext<EnvironmentContextValue | null>(
  null
)

type Props = {
  children: React.ReactNode
  environments: Environment[]
}

export default function EnvironmentProvider({ children, environments }: Props) {
  const defaultEnvironment = React.useMemo(
    () => environments.find((env) => env.isDefault),
    [environments]
  )

  const [currentEnvironmentId, setCurrentEnvironmentId] = useQueryState(
    'environmentId',
    {
      shallow: false,
      defaultValue: defaultEnvironment?.id ?? 'all',
    }
  )

  const contextValue = React.useMemo(() => {
    return {
      currentEnvironmentId: currentEnvironmentId ?? defaultEnvironment?.id,
      setCurrentEnvironmentId,
      environments,
    }
  }, [
    currentEnvironmentId,
    setCurrentEnvironmentId,
    environments,
    defaultEnvironment?.id,
  ])

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
