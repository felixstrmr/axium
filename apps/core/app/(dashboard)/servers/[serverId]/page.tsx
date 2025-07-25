import { GitBranch } from 'lucide-react'
import { notFound } from 'next/navigation'
import ErrorState from '@/components/error-state'
import SSHView from '@/components/views/ssh-view'
import { getIdentity } from '@/queries/identities'
import { getServer } from '@/queries/servers'
import type { Environment, Identity, Server } from '@/types'

type ServerWithEnvironment = Server & {
  environment: Environment | null
}

type Props = {
  params: Promise<{ serverId: string }>
  searchParams: Promise<{ environmentId: string | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
  const { serverId } = await params
  const { environmentId } = await searchParams

  const [server, identity] = await Promise.all([
    getServer(serverId),
    getIdentity('c0cd55f6-1b7b-4fef-a2f1-8e1f307b3ed1'),
  ])

  if (!server || !identity) {
    return notFound()
  }

  const isServerInEnvironment = (server: ServerWithEnvironment) => {
    if (!server.environment) {
      return true
    }

    if (environmentId === undefined || environmentId === null) {
      return true
    }

    if (server.environment.id === environmentId) {
      return true
    }

    return false
  }

  if (!isServerInEnvironment(server as ServerWithEnvironment)) {
    return (
      <div className='size-full flex items-center justify-center'>
        <ErrorState
          background={false}
          icon={GitBranch}
          title='Server is not in the selected environment'
          description={`Please select the "${server.environment?.name}" environment`}
        />
      </div>
    )
  }

  const View = (identity: Identity) => {
    switch (identity.type) {
      case 'ssh':
        return (
          <SSHView server={server} identity={identity} environment={null} />
        )
      case 'vnc':
        return <></>
      case 'rdp':
        return <></>
    }
  }

  return View(identity)
}
