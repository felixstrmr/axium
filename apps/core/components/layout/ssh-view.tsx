import SSHViewHeader from '@/components/layout/ssh-view-header'
import env from '@/lib/env'
import { getCredential } from '@/queries/credentials'
import { Server, ServerConnection } from '@axium/database/types'
import { decrypt } from '@axium/utils/encryption'
import dynamic from 'next/dynamic'

const SSHTerminal = dynamic(() => import('@/components/ssh-terminal'))

type Props = {
  server: Server
  connection: ServerConnection
}

export default async function SSHView({ server, connection }: Props) {
  let username = connection.username
  let password = connection.password

  if (connection.credentialId) {
    const credential = await getCredential(connection.credentialId)

    if (credential) {
      username = credential.username
      password = credential.password
    }
  }

  if (!username || !password) {
    return null
  }

  const decryptedPassword = await decrypt(env.ENCRYPTION_KEY, password)

  return (
    <div className='flex size-full flex-col'>
      <SSHViewHeader server={server} />
      <div className='size-full px-1 pb-1'>
        <div className='size-full overflow-hidden rounded-lg bg-zinc-950 p-4 shadow-xs'>
          <SSHTerminal
            serverId={server.id}
            host={server.host}
            port={connection.port}
            username={username}
            password={decryptedPassword}
          />
        </div>
      </div>
    </div>
  )
}
