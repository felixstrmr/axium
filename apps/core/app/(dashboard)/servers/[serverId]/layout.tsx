import { getServerConnections } from '@/queries/server'
import { notFound } from 'next/navigation'

type Props = {
  rdp: React.ReactNode
  ssh: React.ReactNode
  vnc: React.ReactNode
  params: Promise<{ serverId: string }>
}

export default async function ServerLayout({ rdp, ssh, vnc, params }: Props) {
  const { serverId } = await params

  const connections = await getServerConnections(serverId)

  if (connections.length === 0) {
    notFound()
  }

  const defaultConnection = connections.find(
    (connection) => connection.isDefault,
  )

  if (defaultConnection) {
    switch (defaultConnection.type) {
      case 'rdp':
        return rdp
      case 'ssh':
        return ssh
      case 'vnc':
        return vnc
    }
  }

  return <div>ServerLayout</div>
}
