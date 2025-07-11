'use client'

import { loadXtermModules } from '@/utils/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { Loader } from 'lucide-react'
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
  const [isLoading, setIsLoading] = React.useState(true)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  React.useEffect(() => {
    if (!terminalRef.current || isInitialized || !isClient) return

    const initTerminal = async () => {
      try {
        setIsLoading(true)

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
          setIsLoading(false)
          setIsInitialized(true)
        })

        socket.current.on('ssh:error', (error: string) => {
          setIsLoading(false)
          toast.error(error)
        })

        socket.current.on('ssh:disconnected', () => {
          setIsLoading(false)
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
          setIsInitialized(false)
        }
      } catch (err) {
        console.error('Failed to initialize terminal:', err)
        toast.error('Failed to initialize terminal')
        setIsLoading(false)
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

  return (
    <div className='relative size-full rounded-b-xl bg-zinc-950 p-4'>
      {isLoading && (
        <div className='absolute inset-0 z-10 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-2'>
            <Loader className='text-foreground size-4 animate-spin' />
            <p className='text-foreground text-sm'>
              Connecting to {serverName}...
            </p>
          </div>
        </div>
      )}
      <div ref={terminalRef} className='size-full' />
    </div>
  )
}
