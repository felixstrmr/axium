import { Server } from '@/db/types'

type Props = {
  servers: Server[]
}

export default function ServersCard({ servers }: Props) {
  return (
    <div className='rounded-2xl bg-zinc-800 p-1'>
      <div className='flex items-center justify-between p-4'>
        <div></div>
      </div>
      <div className='bg-background rounded-lg border p-4 shadow-xs'></div>
    </div>
  )
}
