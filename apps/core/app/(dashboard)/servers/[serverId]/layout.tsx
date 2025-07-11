import { getServer, getServerConnections } from '@/queries/server'
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

  return (
    <div>
      <pre>{JSON.stringify(server, null, 2)}</pre>
      <pre>{JSON.stringify(connections, null, 2)}</pre>
    </div>
  )
}
