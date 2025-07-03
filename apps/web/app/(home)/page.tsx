export default function Page() {
  return (
    <div className='mx-auto w-full max-w-3xl pt-48'>
      <div className='flex flex-col items-center text-center'>
        <div className='motion-opacity-in-0 motion-duration-700 motion-translate-y-in-50 motion-blur-in-xs text-muted-foreground rounded-full border px-4 py-1 text-sm font-medium'>
          <div className='mr-2 inline-flex size-2 animate-pulse rounded-full bg-green-500' />
          Open Source & Self-Hosted
        </div>
        <h1 className='motion-opacity-in-0 motion-duration-700 motion-delay-200 motion-translate-y-in-50 motion-blur-in-xs mt-8 max-w-md text-6xl font-semibold tracking-tight'>
          Take Control of Your Infrastructure
        </h1>
        <p className='motion-opacity-in-0 motion-duration-700 motion-delay-300 motion-translate-y-in-50 motion-blur-in-xs text-muted-foreground mt-4 max-w-md text-2xl'>
          The open-source server management platform that gives your team
          complete control and visibility.
        </p>
      </div>
    </div>
  )
}
