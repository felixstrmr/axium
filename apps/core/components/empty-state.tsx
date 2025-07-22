import { cn } from '@axium/ui/lib/utils'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  title: string
  description: string
  background?: boolean
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  background = false,
}: Props) {
  return (
    <div
      className={cn(
        'h-48 flex items-center justify-center',
        background && 'bg-background border rounded-lg shadow-xs'
      )}
    >
      <div className='flex flex-col items-center text-center'>
        <div className='p-1 border border-dashed rounded-xl'>
          <div className='bg-background shadow-xs border rounded-md size-12 flex items-center justify-center'>
            <Icon className='size-6 text-muted-foreground' />
          </div>
        </div>
        <div className='mt-3'>
          <h3 className='text-lg font-semibold tracking-tight'>{title}</h3>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
    </div>
  )
}
