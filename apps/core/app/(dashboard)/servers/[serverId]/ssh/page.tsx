import { db } from '@/db'
import { servers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const SSHTerminal = dynamic(() => import('@/components/ssh-terminal'))

type Props = {
  params: Promise<{ serverId: string }>
}

export default async function Page({ params }: Props) {
  const { serverId } = await params

  const server = await db.query.servers.findFirst({
    where: eq(servers.id, serverId),
  })

  if (!server) {
    return notFound()
  }

  return (
    <div className='flex size-full flex-col'>
      <div className='border-b p-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>{server.name}</h1>
      </div>
      <SSHTerminal
        key={123}
        serverId={'123'}
        serverName={'server'}
        host={'10.20.20.1'}
        port={22}
        username={'root'}
        password={process.env.PW}
        credentialId={''}
      />
    </div>
  )
}
