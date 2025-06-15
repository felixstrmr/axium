import DashboardHeaderBreadcrumb from '@/components/headers/dashboard-header-breadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/signin')
  }

  const user = session.user
  const initials = user.name
    ?.split(' ')
    .map((name) => name[0])
    .join('')

  return (
    <div className='flex items-center justify-between border-b px-4 py-2 pr-2'>
      <DashboardHeaderBreadcrumb />
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className='text-xs'>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
