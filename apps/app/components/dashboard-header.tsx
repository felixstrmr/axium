import DashboardHeaderBreadcrumb from '@/components/dashboard-header-breadcrumb'
import { auth } from '@axium/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/signin')
  }

  const initials = session.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className='flex items-center justify-between border-b p-4'>
      <DashboardHeaderBreadcrumb />
      <div className='bg-muted flex size-8 items-center justify-center rounded-full border'>
        {initials}
      </div>
    </div>
  )
}
