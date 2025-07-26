'use client'

import { Toaster } from '@axium/ui/components/sonner'
import { Loader2 } from 'lucide-react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

type Props = {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
    >
      {children}
      <Toaster
        icons={{
          loading: <Loader2 className='size-4 animate-spin' />,
        }}
      />
    </NextThemesProvider>
  )
}
