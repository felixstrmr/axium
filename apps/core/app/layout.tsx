import RootProvider from 'components/providers/root-provider'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import '@axium/ui/globals.css'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <RootProvider>
          <main className='w-screen h-screen'>{children}</main>
        </RootProvider>
      </body>
    </html>
  )
}
