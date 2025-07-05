import ServerIcon from '@axium/ui/icons/server-icon'

export default function Page() {
  return (
    <div className='flex size-full items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='rounded-full border border-dashed border-zinc-800 p-4'>
          <div className='bg-muted rounded-full p-6'>
            <ServerIcon
              className='text-muted-foreground size-12'
              aria-hidden='true'
            />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            It&apos;s empty here
          </h1>
          <p className='text-muted-foreground'>
            Choose a server to connect to.
          </p>
        </div>
      </div>
    </div>
  )
}
