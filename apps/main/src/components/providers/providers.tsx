import { ThemeProvider } from '@/src/components/providers/theme-provider'
import { Toaster } from '@axium/ui/components/sonner'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute='class' forcedTheme='dark'>
      {children}
      <Toaster position='bottom-center' />
    </ThemeProvider>
  )
}
