'use client'

import { FitAddon } from '@xterm/addon-fit'
import React from 'react'
import { io, Socket } from 'socket.io-client'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

type Props = {
  serverId: string
  host: string
  port: number
  username?: string
  password?: string
  credentialId?: string
}

export default function SSHTerminal({
  serverId,
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

  React.useEffect(() => {
    if (!terminalRef.current) return

    const initTerminal = async () => {
      const { Terminal } = await import('xterm')
      const { FitAddon } = await import('@xterm/addon-fit')
      const { WebLinksAddon } = await import('@xterm/addon-web-links')

      terminal.current = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'Monospace, Monaco, "Courier New", monospace',
        theme: {
          background: '#09090b',
          foreground: '#d4d4d4',
          cursor: '#d4d4d4',
          black: '#000000',
          red: '#cd3131',
          green: '#0dbc79',
          yellow: '#e5e510',
          blue: '#2472c8',
          magenta: '#bc3fbc',
          cyan: '#11a8cd',
          white: '#e5e5e5',
          brightBlack: '#666666',
          brightRed: '#f14c4c',
          brightGreen: '#23d18b',
          brightYellow: '#f5f543',
          brightBlue: '#3b8eea',
          brightMagenta: '#d670d6',
          brightCyan: '#29b8db',
          brightWhite: '#e5e5e5',
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
        terminal.current?.write('\r\n*** SSH Connection Established ***\r\n')
      })

      socket.current.on('ssh:error', (error: string) => {
        terminal.current?.write(`\r\n*** Error: ${error} ***\r\n`)
      })

      socket.current.on('ssh:disconnected', () => {
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
      }
    }

    initTerminal()
  }, [serverId, host, port, username, password, credentialId])

  return (
    <div className='bg-foreground size-full p-4'>
      <div ref={terminalRef} className='size-full' />
    </div>
  )
}
