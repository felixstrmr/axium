import EmptyState from '@/components/empty-state'
import { Server } from 'lucide-react'

export default function Page() {
  return (
    <div className='flex size-full items-center justify-center'>
      <EmptyState
        icon={Server}
        title='No server selected'
        description='Select a server to connect to.'
      />
    </div>
  )
}
