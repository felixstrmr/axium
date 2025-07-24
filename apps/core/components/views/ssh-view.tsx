import dynamic from 'next/dynamic'
import SSHViewHeader from '@/components/views/ssh-view-header'
import type { Environment, Identity, Server } from '@/types'

const SSHViewCanvas = dynamic(
  () => import('@/components/views/ssh-view-canvas')
)

type Props = {
  server: Server
  identity: Identity
  environment: Environment | null
}

export default async function SSHView({
  server,
  identity,
  environment,
}: Props) {
  return (
    <div className='flex size-full flex-col'>
      <SSHViewHeader
        server={server}
        identity={identity}
        environment={environment}
      />
      <div className='size-full px-1 pb-1'>
        <div className='size-full overflow-hidden rounded-lg bg-zinc-950 p-4 shadow-xs'>
          <SSHViewCanvas
            serverId={server.id}
            host={'10.20.20.1'}
            port={22}
            username={'root'}
            password={process.env.PW!}
          />
        </div>
      </div>
    </div>
  )
}
