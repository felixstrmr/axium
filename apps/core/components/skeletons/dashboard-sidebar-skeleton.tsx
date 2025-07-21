import { Separator } from '@axium/ui/components/separator'
import { Skeleton } from '@axium/ui/components/skeleton'

export default function DashboardSidebarSkeleton() {
  return (
    <div className='p-4'>
      <Skeleton className='size-8 rounded-md' />
      <Separator className='my-4 mx-auto' />
      <div className='flex h-full flex-col justify-between'>
        <div className='space-y-1'>
          <Skeleton className='size-8 rounded-md' />
          <Skeleton className='size-8 rounded-md' />
        </div>
        <div className='space-y-1'>
          <Skeleton className='size-8 rounded-md' />
          <Skeleton className='size-8 rounded-md' />
          <Separator className='my-4 mx-auto' />
          <Skeleton className='size-8 rounded-md' />
        </div>
      </div>
    </div>
  )
}
