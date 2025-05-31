'use client'

import { FitAddon } from '@xterm/addon-fit'
import { Loader } from 'lucide-react'
import React from 'react'
import { io, Socket } from 'socket.io-client'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

type Props = {
  serverId: string
  serverName: string
  host: string
  port: number
  username?: string
  password?: string
  credentialId?: string
}

export default function SSHTerminal({
  serverId,
  serverName,
  host,
  port,
  username,
  password,
  credentialId,
}: Props) {
  const terminalRef = React.useRef<HTMLDivElement>(null)
  const terminal = React.useRef<Terminal>(null)
  const socket = React.useRef<Socket | null>(null)
  const fitAddon = React.useRef<FitAddon>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (!terminalRef.current) return

    const initTerminal = async () => {
      setIsLoading(true)
      const { Terminal } = await import('xterm')
      const { FitAddon } = await import('@xterm/addon-fit')
      const { WebLinksAddon } = await import('@xterm/addon-web-links')

      terminal.current = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'var(--font-geist-mono)',
        theme: {
          background: '#09090b',
        },
      })

      fitAddon.current = new FitAddon()
      terminal.current.loadAddon(fitAddon.current)
      terminal.current.loadAddon(new WebLinksAddon())

      terminal.current.open(terminalRef.current as HTMLElement)
      fitAddon.current.fit()

      socket.current = io({
        path: '/api/ssh/socket',
      })

      socket.current.on('connect', () => {
        console.log('Socket connected')

        socket.current?.emit('ssh:connect', {
          serverId,
          host,
          port,
          username,
          password,
          credentialId,
        })
      })

      socket.current.on('ssh:data', (data: string) => {
        terminal.current?.write(data)
      })

      socket.current.on('ssh:connected', () => {
        setIsLoading(false)
        terminal.current?.write('\r\n*** SSH Connection Established ***\r\n')
      })

      socket.current.on('ssh:error', (error: string) => {
        setIsLoading(false)
        terminal.current?.write(`\r\n*** Error: ${error} ***\r\n`)
      })

      socket.current.on('ssh:disconnected', () => {
        setIsLoading(false)
        terminal.current?.write('\r\n*** SSH Connection Closed ***\r\n')
      })

      terminal.current.onData((data: string) => {
        socket.current?.emit('ssh:data', data)
      })

      const handleResize = () => {
        if (fitAddon.current && terminal.current) {
          fitAddon.current.fit()
          socket.current?.emit('ssh:resize', {
            cols: terminal.current.cols,
            rows: terminal.current.rows,
          })
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        socket.current?.disconnect()
        terminal.current?.dispose()
        setIsLoading(false)
      }
    }

    initTerminal()
  }, [serverId, host, port, username, password, credentialId])

  return (
    <div className='relative size-full bg-zinc-950 p-4'>
      {isLoading && (
        <div className='absolute inset-0 z-10 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-2'>
            <Loader className='text-primary-foreground size-4 animate-spin' />
            <p className='text-primary-foreground text-sm'>
              Connecting to {serverName}...
            </p>
          </div>
        </div>
      )}
      <div ref={terminalRef} className='size-full' />
    </div>
  )
}
