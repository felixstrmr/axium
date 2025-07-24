import { notFound } from 'next/navigation'
import SSHView from '@/components/views/ssh-view'
import { getIdentity } from '@/queries/identities'
import { getServer } from '@/queries/servers'
import type { Identity } from '@/types'

type Props = {
  params: Promise<{ serverId: string }>
}

export default async function Page({ params }: Props) {
  const { serverId } = await params

  const [server, identity] = await Promise.all([
    getServer(serverId),
    getIdentity('c0cd55f6-1b7b-4fef-a2f1-8e1f307b3ed1'),
  ])

  if (!server || !identity) {
    return notFound()
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
