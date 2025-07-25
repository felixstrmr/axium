import { GitBranch } from 'lucide-react'
import { notFound } from 'next/navigation'
import EmptyState from '@/components/empty-state'
import SSHView from '@/components/views/ssh-view'
import { getIdentity } from '@/queries/identities'
import { getServer } from '@/queries/servers'
import type { Identity } from '@/types'

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

  if (environmentId !== 'all' && environmentId !== server?.environmentId) {
    return (
      <div className='size-full flex items-center justify-center'>
        <EmptyState
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
