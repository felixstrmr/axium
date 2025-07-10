'use client'

import EmptyState from '@/components/empty-state'
import CredentialListItem from '@/components/features/settings/credentials/credential-list-item'
import { useEnvironment } from '@/components/providers/environment-provider'
import { Credential } from '@axium/database/types'
import { Key } from 'lucide-react'
import React from 'react'

type Props = {
  credentials: Credential[]
}

export default function CredentialList({ credentials }: Props) {
  const { currentEnvironmentId } = useEnvironment()

  const filteredCredentials = React.useMemo(() => {
    if (currentEnvironmentId === 'all') {
      return credentials
    }
    return credentials.filter(
      (credential) => credential.environmentId === currentEnvironmentId,
    )
  }, [currentEnvironmentId, credentials])

  if (filteredCredentials.length === 0) {
    return (
      <div className='bg-background rounded-xl border shadow-xs'>
        <EmptyState
          icon={Key}
          title='No credentials found'
          description='No credentials found for this environment'
        />
      </div>
    )
  }

  return (
    <div>
      <div className='px-4 py-2'>
        <p className='text-muted-foreground text-sm'>Name</p>
      </div>
      <div>
        {filteredCredentials.map((credential, index) => (
          <CredentialListItem
            key={credential.id}
            credential={credential}
            isOnlyItem={filteredCredentials.length === 1}
          />
        ))}
      </div>
    </div>
  )
}
