import DashboardHeader from '@/components/dashboard-header'
import DashboardSidebar from '@/components/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='flex size-full bg-zinc-950'>
      <DashboardSidebar />
      <div className='flex-1 py-1 pr-1'>
        <div className='flex size-full flex-col rounded-lg border bg-zinc-900/50'>
          <DashboardHeader />
          {children}
        </div>
      </div>
    </div>
  )
}
