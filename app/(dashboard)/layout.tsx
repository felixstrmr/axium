import DashboardSidebar from '@/components/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='bg-muted flex size-full'>
      <DashboardSidebar />
      <div className='flex-1 p-1 pl-0'>
        <div className='bg-background size-full rounded-lg border shadow-xs'>
          {children}
        </div>
      </div>
    </div>
  )
}
