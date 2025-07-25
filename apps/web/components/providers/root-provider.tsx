import ThemeProvider from '@axium/ui/providers/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

type Props = {
  children: React.ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <ThemeProvider>
      {children}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}
