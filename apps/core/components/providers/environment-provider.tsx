'use client'

import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'
import type { Environment } from '@/types'

type EnvironmentContextValue = {
  selectedEnvironmentId: string | null
  setCurrentEnvironmentId: (id: string | null) => void
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
  const [currentEnvironmentId, setCurrentEnvironmentId] = useQueryState(
    'environmentId',
    parseAsString.withOptions({
      shallow: false,
      clearOnDefault: false,
    })
  )

  const selectedEnvironmentId = currentEnvironmentId ?? null

  const contextValue = React.useMemo(() => {
    return {
      selectedEnvironmentId,
      setCurrentEnvironmentId,
      environments,
    }
  }, [selectedEnvironmentId, setCurrentEnvironmentId, environments])

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
