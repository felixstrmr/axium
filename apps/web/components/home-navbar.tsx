import { buttonVariants } from '@axium/ui/components/button'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import GitHubIcon from '@axium/ui/icons/github-icon'
import Link from 'next/link'

export default async function HomeNavbar() {
  return (
    <div className='fixed right-0 left-0 mx-auto mt-2 flex w-full max-w-3xl items-center justify-between rounded-xl bg-zinc-900/50 p-2'>
      <Link href='/' className='flex items-center gap-2'>
        <div className='bg-primary flex size-8 items-center justify-center rounded-md'>
          <AxiumIcon
            className='text-primary-foreground size-4'
            aria-hidden='true'
          />
        </div>
        <span className='text-foreground text-2xl font-semibold tracking-tight'>
          Axium
        </span>
      </Link>
      <div className='flex items-center gap-2'>
        <Link
          href='https://axium.userjot.com/roadmap'
          target='_blank'
          className={buttonVariants({ variant: 'secondary' })}
        >
          Roadmap
        </Link>
        <Link
          href='https://github.com/felixstrmr/axium'
          className={buttonVariants({ variant: 'default' })}
        >
          <GitHubIcon aria-hidden='true' />
          GitHub
        </Link>
      </div>
    </div>
  )
}
