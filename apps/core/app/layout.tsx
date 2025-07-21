import RootProvider from 'components/providers/root-provider'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import '@axium/ui/globals.css'

export const metadata: Metadata = {
  title: 'Axium • Powerful remote server management',
}

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
