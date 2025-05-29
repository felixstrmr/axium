import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex size-full flex-col p-4'>
      <div className='flex h-8 items-center justify-between'>
        <h1 className='text-2xl font-semibold tracking-tight'>Servers</h1>
        <Link
          href='/settings/servers/create'
          className={buttonVariants({ variant: 'default' })}
        >
          <Plus />
          Create
        </Link>
      </div>
    </div>
  )
}
