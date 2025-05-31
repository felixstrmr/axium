import { db } from '@/db'
import { servers } from '@/db/schema'
import { decrypt } from '@/utils/encryption'
import { eq } from 'drizzle-orm'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const SSHTerminal = dynamic(() => import('@/components/ssh-terminal'), {
  loading: () => (
    <div className='flex h-full items-center justify-center'>
      <div className='text-muted-foreground'>Loading terminal...</div>
    </div>
  ),
})

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
    sshUsername = server.credential.username
    sshPassword = server.credential.password
  }

  if (sshPassword) {
    sshPassword = decrypt(sshPassword)
  }

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <div className='flex items-center justify-between border-b p-4'>
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            {server.name}
          </h1>
          <div className='bg-background flex items-center gap-2 rounded-full border px-2 py-0.5 shadow-xs'>
            <div
              className='size-2 rounded-full'
              style={{ backgroundColor: server.environment.color }}
            />
            <p className='text-foreground text-sm'>{server.environment.name}</p>
          </div>
        </div>
        <div>
          <p className='text-muted-foreground'>{server.host}</p>
        </div>
      </div>
      <SSHTerminal
        key={server.id}
        serverId={server.id}
        serverName={server.name}
        host={server.host}
        port={server.port}
        username={sshUsername || ''}
        password={sshPassword || ''}
        credentialId={server.credentialId || ''}
      />
    </div>
  )
}
