import SSHTerminal from '@/components/ssh-terminal'
import { db } from '@/db'
import { servers } from '@/db/schema'
import { decrypt } from '@/utils/encryption'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ serverId: string }>
}

export default async function Page({ params }: Props) {
  const { serverId } = await params

  const server = await db.query.servers.findFirst({
    where: eq(servers.id, serverId),
    with: {
      credential: true,
      environment: true,
    },
  })

  if (!server) {
    return notFound()
  }

  let sshUsername = server.username
  let sshPassword = server.password

  if (server.credential) {
    sshUsername = server.credential.username || ''
    sshPassword = server.credential.password || ''
  }

  if (sshPassword) {
    sshPassword = decrypt(sshPassword)
  }

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <div className='p-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>{server.name}</h1>
      </div>
      <SSHTerminal
        serverId={server.id}
        host={server.host}
        port={server.port}
        username={sshUsername || ''}
        password={sshPassword || ''}
        credentialId={server.credentialId || ''}
      />
    </div>
  )
}
