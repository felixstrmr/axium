'use client'

import { loadXtermModules } from '@/utils/xterm'
import { FitAddon } from '@xterm/addon-fit'
import React from 'react'
import { io, Socket } from 'socket.io-client'
import { toast } from 'sonner'
import { Terminal } from 'xterm'

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
  const terminal = React.useRef<Terminal | null>(null)
  const socket = React.useRef<Socket | null>(null)
  const fitAddon = React.useRef<FitAddon | null>(null)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  React.useEffect(() => {
    if (!terminalRef.current || isInitialized || !isClient) return

    const initTerminal = async () => {
      try {
        const { Terminal, FitAddon, WebLinksAddon } = await loadXtermModules()

        terminal.current = new Terminal({
          cursorBlink: true,
          fontSize: 14,
          fontFamily: 'var(--font-geist-mono)',
          theme: {
            background: 'rgba(9, 9, 11, 1)',
            foreground: 'rgba(250, 250, 250, 1)',
          },
        })

        fitAddon.current = new FitAddon()
        terminal.current.loadAddon(fitAddon.current)
        terminal.current.loadAddon(new WebLinksAddon())

        terminal.current.open(terminalRef.current as HTMLElement)
        fitAddon.current.fit()

        socket.current = io({
          path: '/api/connections/ssh/socket',
        })

        socket.current.on('connect', () => {
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
          setIsInitialized(true)
        })

        socket.current.on('ssh:error', (error: string) => {
          toast.error(error)
        })

        socket.current.on('ssh:disconnected', () => {})

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
          setIsInitialized(false)
        }
      } catch (err) {
        console.error('Failed to initialize terminal:', err)
        toast.error('Failed to initialize terminal')
      }
    }

    initTerminal()
  }, [
    serverId,
    host,
    port,
    username,
    password,
    credentialId,
    isInitialized,
    isClient,
  ])

  if (!isClient) {
    return null
  }

  return <div ref={terminalRef} className='size-full' />
}
