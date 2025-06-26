import DashboardSidebar from '@/src/components/sidebars/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='flex size-full bg-zinc-900/50'>
      <DashboardSidebar />
      <div className='flex-1 py-1 pr-1'>
        <div className='bg-background flex size-full rounded-sm border shadow-sm'>
          {children}
        </div>
      </div>
    </div>
  )
}
