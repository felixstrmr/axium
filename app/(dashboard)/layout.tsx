import DashboardHeader from '@/components/headers/dashboard-header'
import DashboardSidebar from '@/components/sidebars/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='bg-background flex size-full'>
      <DashboardSidebar />
      <div className='flex-1 py-1 pr-1'>
        <div className='border-border/50 flex size-full flex-col rounded-md border bg-zinc-900/50'>
          <DashboardHeader />
          {children}
        </div>
      </div>
    </div>
  )
}
