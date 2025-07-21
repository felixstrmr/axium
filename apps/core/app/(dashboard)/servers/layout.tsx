import { Suspense } from 'react'
import ServersSidebar from '@/components/sidebars/servers-sidebar'

type Props = {
  children: React.ReactNode
}

export default function ServersLayout({ children }: Props) {
  return (
    <div className='size-full flex gap-1'>
      <Suspense fallback={<div>Loading...</div>}>
        <ServersSidebar />
      </Suspense>
      {children}
    </div>
  )
}
