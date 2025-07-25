import Image from 'next/image'
import WaitlistJoinForm from '@/components/forms/waitlist-join-form'

export default function Page() {
  return (
    <div className='size-full relative flex-col flex pt-36 overflow-hidden'>
      <div className='max-w-4xl mx-auto w-full flex flex-col'>
        <h1 className='text-8xl motion-opacity-in-0 motion-duration-500 motion-translate-y-in-50 motion-blur-in-sm leading-[1.125] font-semibold tracking-tight'>
          The Open-Source Remote <br /> Server Management Platform.
        </h1>
        <p className='text-muted-foreground motion-opacity-in-0 motion-duration-500 motion-translate-y-in-50 motion-blur-in-sm motion-delay-200 mt-4 max-w-xl text-2xl'>
          No more switching between terminals and remote desktop apps. Access
          all your servers from one beautiful dashboard.
        </p>
        <div className='motion-opacity-in-0 motion-duration-400 motion-translate-y-in-50 motion-blur-in-sm motion-delay-300 mt-8'>
          <WaitlistJoinForm />
        </div>
      </div>
      <div className='border-y mt-36'>
        <div className='max-w-7xl mx-auto w-full border-x border-dashed p-1 relative'>
          <div className='absolute z-10 bg-gradient-to-t h-1/2 opacity-25 bottom-0 from-background to-transparent w-full' />
          <Image
            src='/hero.png'
            alt='Hero Image'
            height={1354}
            width={2407}
            priority
            quality={100}
            className='aspect-video shadow-2xl rounded-lg size-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}
