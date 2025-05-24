import { Toaster } from '@/components/ui/sonner'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
