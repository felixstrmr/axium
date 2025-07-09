import { Separator } from '@axium/ui/components/separator'
import { Skeleton } from '@axium/ui/components/skeleton'

export default function DashboardSidebarSkeleton() {
  return (
    <aside className='flex flex-col px-4 py-5'>
      <Skeleton className='size-8 rounded-md' />
      <Separator className='mx-auto my-4 max-w-4' />
    </aside>
  )
}
