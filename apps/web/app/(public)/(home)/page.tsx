import { Terminal } from 'lucide-react'

export default function Page() {
  return (
    <div className='mt-16 py-24'>
      <div className='mx-auto w-full max-w-3xl'>
        <div className='motion-opacity-in-0 motion-translate-y-in-25 motion-blur-in-xs text-muted-foreground w-fit rounded-full border border-zinc-800 px-3 py-1 text-sm'>
          Open-source & Self-hostable
        </div>
        <h1 className='motion-opacity-in-0 motion-translate-y-in-25 motion-blur-in-xs motion-delay-100 mt-8 mb-4 max-w-xl text-6xl font-semibold tracking-tight'>
          Take Control of Your Server{' '}
          <Terminal className='text-muted-foreground mx-1 inline-flex size-12' />{' '}
          Infrastructure
        </h1>
        <p className='motion-opacity-in-0 motion-translate-y-in-25 motion-blur-in-xs motion-delay-200 text-muted-foreground max-w-md text-2xl'>
          Powerful, open-source remote server management platform for
          homelabbers and IT professionals.
        </p>
      </div>
    </div>
  )
}
