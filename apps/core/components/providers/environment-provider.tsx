'use client'

import React from 'react'
import { setEnvironmentAction } from '@/actions/set-environment-action'
import type { Environment } from '@/types'

type EnvironmentContextType = {
  currentEnvironmentId: string
  setCurrentEnvironmentId: (environmentId: string) => void
  environments: Environment[]
}

const EnvironmentContext = React.createContext<EnvironmentContextType>({
  currentEnvironmentId: '',
  setCurrentEnvironmentId: () => {},
  environments: [],
})

type Props = {
  children: React.ReactNode
  environments: Environment[]
  currentEnvironmentId: string | undefined
}

export default function EnvironmentProvider({
  children,
  environments,
  currentEnvironmentId,
}: Props) {
  const defaultEnvironment = React.useMemo(
    () => environments.find((env) => env.isDefault),
    [environments]
  )

  const [environmentId, setEnvironmentId] = React.useState(
    currentEnvironmentId ?? defaultEnvironment?.id ?? 'all'
  )

  const handleSetEnvironmentId = React.useCallback(
    async (environmentId: string) => {
      setEnvironmentAction({
        environmentId,
      }).then(() => {
        setEnvironmentId(environmentId)
      })
    },
    []
  )

  const contextValue = React.useMemo(() => {
    return {
      currentEnvironmentId: environmentId,
      setCurrentEnvironmentId: handleSetEnvironmentId,
      environments,
    }
  }, [environmentId, environments, handleSetEnvironmentId])

  return (
    <EnvironmentContext.Provider value={contextValue}>
      {children}
    </EnvironmentContext.Provider>
  )
}

export function useEnvironment(): EnvironmentContextType {
  const context = React.useContext(EnvironmentContext)

  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }

  return context
}
