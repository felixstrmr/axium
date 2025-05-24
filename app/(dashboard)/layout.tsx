import DashboardSidebar from '@/components/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <DashboardSidebar />
      {children}
    </div>
  )
}
