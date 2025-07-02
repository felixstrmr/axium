'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

type Props = {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute='class'
      forcedTheme='dark'
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
