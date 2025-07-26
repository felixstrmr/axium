import { eq } from 'drizzle-orm'
import { GitBranch } from 'lucide-react'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import ErrorState from '@/components/error-state'
import { db } from '@/db'
import * as schema from '@/db/schema'
import type { Environment, Identity, Server } from '@/types'

const SSHView = dynamic(() => import('@/components/views/ssh-view'))

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

  const serverIdentites = await db.query.serverIdentities.findMany({
    where: eq(schema.serverIdentities.serverId, serverId),
    with: {
      server: {
        with: {
          environment: true,
        },
      },
      identity: true,
    },
  })

  if (!serverIdentites) {
    return notFound()
  }

  const server = serverIdentites[0]?.server
  const identity = serverIdentites[0]?.identity

  if (!server || !identity) {
    return notFound()
  }

  const isServerInEnvironment = (server: ServerWithEnvironment) =>
    !server.environment ||
    environmentId == null ||
    server.environmentId === environmentId

  if (!isServerInEnvironment(server as ServerWithEnvironment)) {
    return (
      <div className='size-full flex items-center justify-center'>
        <ErrorState
          background={false}
          icon={GitBranch}
          title='Server is not in the selected environment'
          description={`Please select the "${server?.environment?.name}" environment`}
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
        return <div>123</div>
      case 'rdp':
        return <div>123</div>
    }
  }

  return View(identity)
}
