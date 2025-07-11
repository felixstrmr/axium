import { Server } from '@axium/database/types'
import { Terminal } from 'lucide-react'

type Props = {
  server: Server
}

export default function SSHViewHeader({ server }: Props) {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex h-8 items-center gap-2'>
        <div className='flex size-8 items-center justify-center'>
          <Terminal className='text-muted-foreground size-4' />
        </div>
        <h1 className='text-2xl font-semibold tracking-tight'>{server.name}</h1>
      </div>
      <p className='text-muted-foreground text-sm'>{server.host}</p>
    </div>
  )
}
