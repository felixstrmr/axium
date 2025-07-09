import { Skeleton } from '@axium/ui/components/skeleton'

export default function ServersSidebarSkeleton() {
  return (
    <aside className='bg-background w-64 max-w-64 min-w-64 rounded-xl p-4 shadow-xs'>
      <Skeleton className='h-8 w-full rounded-md' />
    </aside>
  )
}
