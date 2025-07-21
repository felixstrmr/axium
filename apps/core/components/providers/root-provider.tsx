import ThemeProvider from '@axium/ui/providers/theme-provider'

type Props = {
  children: React.ReactNode
}

export default function RootProvider({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>
}
