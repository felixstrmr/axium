import { Toaster } from '@/components/ui/sonner'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
