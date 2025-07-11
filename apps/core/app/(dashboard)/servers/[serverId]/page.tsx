import { getServer, getServerConnections } from '@/queries/server'
import { ServerConnection } from '@axium/database/types'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const SSHView = dynamic(() => import('@/components/layout/ssh-view'))
const VNCView = dynamic(() => import('@/components/layout/vnc-view'))
const RDPView = dynamic(() => import('@/components/layout/rdp-view'))

type Props = {
  params: Promise<{ serverId: string }>
}

export default async function Page({ params }: Props) {
  const { serverId } = await params

  const [server, connections] = await Promise.all([
    getServer(serverId),
    getServerConnections(serverId),
  ])

  if (!server) {
    notFound()
  }

  const View = (connection: ServerConnection) => {
    switch (connection.type) {
      case 'ssh':
        return <SSHView server={server} connection={connection} />
      case 'vnc':
        return <VNCView />
      case 'rdp':
        return <RDPView />
    }
  }

  const defaultConnection = connections.find(
    (connection) => connection.isDefault,
  )

  if (defaultConnection) {
    return View(defaultConnection)
  }

  return null
}
