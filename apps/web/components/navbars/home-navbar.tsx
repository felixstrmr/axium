import { buttonVariants } from '@axium/ui/components/button'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import GithubIcon from '@axium/ui/icons/github-icon'
import { cn } from '@axium/ui/lib/utils'
import Link from 'next/link'

export default function HomeNavbar() {
  return (
    <div className='flex py-4 max-w-4xl mx-auto w-full justify-between'>
      <Link href='/' className='flex items-center gap-2'>
        <div className={buttonVariants({ variant: 'default', size: 'icon' })}>
          <AxiumIcon />
        </div>
        <h2 className='text-2xl font-semibold tracking-tight'>Axium</h2>
      </Link>
      <div className='flex items-center gap-2'>
        <Link
          href='https://axium.userjot.com/roadmap'
          target='_blank'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'hover:bg-foreground/5'
          )}
        >
          Roadmap
        </Link>
        <Link
          href='https://github.com/felixstrmr/axium'
          target='_blank'
          className={buttonVariants({ variant: 'outline' })}
        >
          <GithubIcon />
          Github
        </Link>
      </div>
    </div>
  )
}
