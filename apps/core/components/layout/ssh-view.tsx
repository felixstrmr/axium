import SSHViewHeader from '@/components/layout/ssh-view-header'
import { getConnectionCredentials } from '@/utils'
import { Server, ServerConnection } from '@axium/database/types'
import dynamic from 'next/dynamic'

const SSHTerminal = dynamic(() => import('@/components/ssh-terminal'))

type Props = {
  server: Server
  connection: ServerConnection
}

export default async function SSHView({ server, connection }: Props) {
  const { username, password } = await getConnectionCredentials(connection)

  if (!username || !password) {
    return <p>No credentials found</p>
  }

  return (
    <div className='flex size-full flex-col'>
      <SSHViewHeader server={server} />
      <div className='size-full px-1 pb-1'>
        <div className='size-full overflow-hidden rounded-lg bg-zinc-950 p-4 shadow-xs'></div>
      </div>
    </div>
  )
}
