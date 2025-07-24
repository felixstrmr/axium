'use client'

import type { FitAddon } from '@xterm/addon-fit'
import { Loader } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { toast } from 'sonner'
import type { Terminal } from 'xterm'
import { loadXtermModules } from '@/utils/xterm'

type Props = {
  serverId: string
  host: string
  port: number
  username: string
  password: string
}

export default function SSHViewCanvas({
  serverId,
  host,
  port,
  username,
  password,
}: Props) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminal = useRef<Terminal | null>(null)
  const socket = useRef<Socket | null>(null)
  const fitAddon = useRef<FitAddon | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!terminalRef.current || isInitialized || !isClient) return

    const initTerminal = async () => {
      const { Terminal, FitAddon, WebLinksAddon } = await loadXtermModules()

      terminal.current = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'var(--font-geist-mono)',
        theme: {
          background: 'rgba(9, 9, 11)',
          foreground: 'rgba(250, 250, 250)',
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
    }

    initTerminal()
  }, [serverId, host, port, username, password, isInitialized, isClient])

  if (!isClient) {
    return null
  }

  return (
    <div className='relative size-full'>
      {!isInitialized && (
        <div className='absolute inset-0 z-10 flex items-center justify-center gap-2 bg-zinc-950'>
          <Loader className='text-primary-foreground size-4 animate-spin' />
          <span className='text-primary-foreground'>Connecting...</span>
        </div>
      )}
      <div ref={terminalRef} className='size-full' />
    </div>
  )
}
