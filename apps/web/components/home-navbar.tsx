import { buttonVariants } from '@axium/ui/components/button'
import { Terminal } from 'lucide-react'
import Link from 'next/link'

export default function HomeNavbar() {
  return (
    <div className='fixed right-0 left-0 mx-auto mt-2 flex w-full max-w-3xl items-center justify-between rounded-xl bg-zinc-900/50 p-2'>
      <Link href='/' className='flex items-center gap-2'>
        <div className='bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md'>
          <Terminal className='size-4' />
        </div>
        <p className='text-2xl font-semibold tracking-tight'>Axium</p>
      </Link>
      <div>
        <Link
          href='https://github.com/felixstrmr/axium'
          className={buttonVariants({ variant: 'default' })}
        >
          Get started
        </Link>
      </div>
    </div>
  )
}
