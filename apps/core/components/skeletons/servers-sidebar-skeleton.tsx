import { Skeleton } from '@axium/ui/components/skeleton'

export default function ServersSidebarSkeleton() {
  return (
    <div className='bg-background min-w-64 border max-w-64 w-64 rounded-xl shadow-xs p-4 flex flex-col gap-4'>
      <Skeleton className='h-8 w-full rounded-md' />
    </div>
  )
}
