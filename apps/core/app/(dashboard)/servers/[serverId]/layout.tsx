import EmptyState from '@/components/empty-state'
import { getServer, getServerConnections } from '@/queries/server'
import { Server } from 'lucide-react'
import { notFound } from 'next/navigation'

type Props = {
  rdp: React.ReactNode
  ssh: React.ReactNode
  vnc: React.ReactNode
  params: Promise<{ serverId: string }>
}

export default async function ServerLayout({ rdp, ssh, vnc, params }: Props) {
  const { serverId } = await params
  const server = await getServer(serverId)

  if (!server) {
    notFound()
  }

  const connections = await getServerConnections(serverId)

  if (connections.length > 0) {
    const defaultConnection = connections.find(
      (connection) => connection.isDefault,
    )

    if (defaultConnection) {
      return defaultConnection.type === 'rdp'
        ? rdp
        : defaultConnection.type === 'vnc'
          ? vnc
          : ssh
    }
  }

  if (connections.length === 0) {
    return (
      <div className='flex size-full items-center justify-center'>
        <EmptyState
          icon={Server}
          title='No connections found'
          description='Create a connection to start using the server.'
        />
      </div>
    )
  }

  return (
    <div>
      <pre>{JSON.stringify(server, null, 2)}</pre>
      <pre>{JSON.stringify(connections, null, 2)}</pre>
    </div>
  )
}
