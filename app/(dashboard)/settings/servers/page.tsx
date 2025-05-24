import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex size-full flex-col'>
      <div className='flex items-center justify-between p-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>Servers</h1>
        <Link
          href={'/settings/servers/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create server
        </Link>
      </div>
      <Separator />
    </div>
  )
}
