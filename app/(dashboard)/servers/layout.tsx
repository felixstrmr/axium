import DashboardHeader from '@/components/headers/dashboard-header'
import ServersSidebar from '@/components/sidebars/servers-sidebar'

type Props = {
  children: React.ReactNode
}

export default function ServersLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <ServersSidebar />
      <div className='flex flex-1 flex-col'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}
