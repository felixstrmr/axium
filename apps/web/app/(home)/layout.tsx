import type * as React from 'react'
import HomeNavbar from '@/components/navbars/home-navbar'

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className='size-full flex flex-col bg-muted/50'>
      <HomeNavbar />
      <div className='flex bg-background size-full border rounded-xl shadow-xs'>
        {children}
      </div>
    </div>
  )
}
