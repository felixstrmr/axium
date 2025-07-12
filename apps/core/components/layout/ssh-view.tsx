import SSHViewHeader from '@/components/layout/ssh-view-header'
import { getConnectionCredentials } from '@/utils'
import { Environment, Server, ServerConnection } from '@axium/database/types'
import dynamic from 'next/dynamic'

const SSHViewCanvas = dynamic(
  () => import('@/components/layout/ssh-view-canvas'),
)

type Props = {
  server: Server
  connection: ServerConnection
  environment: Environment | null
}

export default async function SSHView({
  server,
  connection,
  environment,
}: Props) {
  const { username, password } = await getConnectionCredentials(connection)

  if (!username || !password) {
    return <p>No credentials found</p>
  }

  return (
    <div className='flex size-full flex-col'>
      <SSHViewHeader server={server} environment={environment} />
      <div className='size-full px-1 pb-1'>
        <div className='size-full overflow-hidden rounded-lg bg-zinc-950 p-4 shadow-xs'></div>
      </div>
    </div>
  )
}
