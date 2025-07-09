import { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  title: string
  description: string
}

export default function EmptyState({ icon: Icon, title, description }: Props) {
  return (
    <div className='bg-background flex h-48 items-center justify-center rounded-xl border shadow-xs'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='bg-muted rounded-lg p-2'>
          <Icon className='text-muted-foreground size-6' />
        </div>
        <div className='text-center'>
          <h2 className='text-lg font-semibold tracking-tight'>{title}</h2>
          <p className='text-muted-foreground text-sm'>{description}</p>
        </div>
      </div>
    </div>
  )
}
