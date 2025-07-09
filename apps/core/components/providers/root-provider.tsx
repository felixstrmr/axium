import { Toaster } from '@axium/ui/components/sonner'
import ThemeProvider from '@axium/ui/providers/theme-provider'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type Props = {
  children: React.ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        {children}
        <Toaster position='bottom-center' />
      </ThemeProvider>
    </NuqsAdapter>
  )
}
