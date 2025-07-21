import ThemeProvider from '@axium/ui/providers/theme-provider'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type Props = {
  children: React.ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <NuqsAdapter>
      <ThemeProvider>{children}</ThemeProvider>
    </NuqsAdapter>
  )
}
