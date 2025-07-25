import { Server } from 'lucide-react'
import EmptyState from '@/components/empty-state'

export default function Page() {
  return (
    <div className='flex size-full items-center justify-center'>
      <EmptyState
        background={false}
        icon={Server}
        title='No server selected'
        description='Select a server to get started'
      />
    </div>
  )
}
