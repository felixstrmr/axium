import { Separator } from '@axium/ui/components/separator'
import { Globe, Server, Shield, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import WaitlistJoinForm from '@/components/forms/waitlist-join-form'

export default function Page() {
  return (
    <div className='size-full relative flex-col flex pt-20 overflow-hidden'>
      <div className='max-w-5xl mx-auto w-full flex flex-col'>
        <Link
          href='https://x.com/axiumone'
          target='_blank'
          className='bg-background motion-opacity-in-0 motion-duration-500 motion-translate-y-in-50 motion-blur-in-sm shadow-xs border rounded-full w-fit px-3 text-sm py-1 flex items-center gap-2'
        >
          <span className='text-muted-foreground'>
            Don&apos;t miss any updates
          </span>
          <Separator orientation='vertical' className='max-h-3' />
          <span className='text-foreground'>Follow us on X</span>
        </Link>
        <h1 className='text-8xl mt-8 motion-opacity-in-0 motion-duration-500 motion-translate-y-in-50 motion-blur-in-sm motion-delay-200 leading-[1.125] font-semibold tracking-tight'>
          The Open-Source{' '}
          <span className='text-primary'>
            Remote <br /> Server Management Platform.
          </span>
        </h1>
        <p className='text-muted-foreground motion-opacity-in-0 motion-duration-500 motion-translate-y-in-50 motion-blur-in-sm motion-delay-300 mt-4 max-w-xl text-2xl'>
          No more switching between terminals and remote desktop apps. Access
          all your servers from one beautiful dashboard.
        </p>
        <div className='motion-opacity-in-0 bg-muted/50 p-1 w-fit rounded-xl motion-duration-400 motion-translate-y-in-50 motion-blur-in-sm motion-delay-400 mt-8'>
          <WaitlistJoinForm />
          <div className='p-3'>
            <p className='text-sm text-muted-foreground'>
              We&apos;ll notify you when we launch. 🚀
            </p>
          </div>
        </div>
      </div>
      <div className='mt-36 max-w-5xl  mx-auto w-full grid grid-cols-4'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Server className='size-5 text-muted-foreground' />
            <h2 className='text-lg font-semibold tracking-tight'>
              Multi-Protocol
            </h2>
          </div>
          <p className='text-muted-foreground'>
            Support for SSH, VNC, and <br /> RDP connections.
          </p>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Shield className='size-5 text-muted-foreground' />
            <h2 className='text-lg font-semibold tracking-tight'>
              Secure Access
            </h2>
          </div>
          <p className='text-muted-foreground'>
            Enterprise-grade security <br /> with encrypted connections.
          </p>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Users className='size-5 text-muted-foreground' />
            <h2 className='text-lg font-semibold tracking-tight'>
              User Management
            </h2>
          </div>
          <p className='text-muted-foreground'>
            Role-based access control <br /> and team collaboration.
          </p>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Globe className='size-5 text-muted-foreground' />
            <h2 className='text-lg font-semibold tracking-tight'>
              Open-Source
            </h2>
          </div>
          <p className='text-muted-foreground'>
            Open-source and free to use. <br />
            Contribute to the project.
          </p>
        </div>
      </div>
      <div className='border-y mt-12'>
        <div className='max-w-7xl mx-auto w-full border-x border-dashed p-1'>
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
