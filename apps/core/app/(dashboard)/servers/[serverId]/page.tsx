import { getServer, getServerConnections } from '@/queries/server'
import { ServerConnection } from '@axium/database/types'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const SSHView = dynamic(() => import('@/components/layout/ssh-view'))
const VNCView = dynamic(() => import('@/components/layout/vnc-view'))
const RDPView = dynamic(() => import('@/components/layout/rdp-view'))

type Props = {
  params: Promise<{ serverId: string }>
  searchParams: Promise<{ connectionId: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { serverId } = await params
  const { connectionId } = await searchParams

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

  if (connectionId) {
    const connection = connections.find(
      (connection) => connection.id === connectionId,
    )

    if (connection) {
      return View(connection)
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
