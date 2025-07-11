import { getServer, getServerConnections } from '@/queries/server'
import { Button } from '@axium/ui/components/button'
import { Loader, Settings, Terminal } from 'lucide-react'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const SSHTerminal = dynamic(() => import('@/components/ssh-terminal'), {
  loading: () => (
    <div className='flex size-full items-center justify-center'>
      <Loader className='size-4 animate-spin' />
    </div>
  ),
})

type Props = {
  params: Promise<{ serverId: string }>
}

export default async function Page({ params }: Props) {
  const { serverId } = await params

  const [server, connections] = await Promise.all([
    getServer(serverId),
    getServerConnections(serverId),
  ])

  if (!server) {
    notFound()
  }

  return (
    <div className='flex size-full flex-col'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-2'>
          <div className='flex size-8 items-center justify-center'>
            <Terminal className='text-muted-foreground size-4' />
          </div>
          <h1 className='text-2xl font-semibold tracking-tight'>
            {server.name}
          </h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='icon'>
            <Settings className='size-4' />
          </Button>
        </div>
      </div>
      <div className='flex size-full overflow-hidden px-1 pb-1'>
        <div className='flex size-full rounded-lg border bg-zinc-950 p-4 shadow-xs'>
          <SSHTerminal
            serverId={serverId}
            serverName={server.name}
            host={server.host}
            port={22}
            username={'root'}
            password={process.env.SSH_PASSWORD}
          />
        </div>
      </div>
    </div>
  )
}
