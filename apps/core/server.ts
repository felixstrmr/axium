import { createServer } from 'http'
import next from 'next'
import { NodeSSH } from 'node-ssh'
import type { Socket } from 'socket.io'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

type ConnectionData = {
  serverId: string
  host: string
  port: number
  username: string
  password: string
  credentialId: string
}

type ResizeData = {
  cols: number
  rows: number
}

const sshConnections = new Map<string, NodeSSH>()

app.prepare().then(() => {
  const server = createServer(handler)

  const io = new Server(server, {
    path: '/api/connections/ssh/socket',
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket: Socket) => {
    let ssh: NodeSSH | null = null

    socket.on('ssh:connect', async (connectionData: ConnectionData) => {
      try {
        const { host, port, username, password } = connectionData

        ssh = new NodeSSH()

        await ssh.connect({
          host,
          port,
          username,
          password,
          tryKeyboard: true,
          keepaliveInterval: 10000,
          keepaliveCountMax: 3,
        })

        sshConnections.set(socket.id, ssh)

        const shell = await ssh.requestShell({
          term: 'xterm-256color',
        })

        socket.emit('ssh:connected')

        shell.on('data', (data: Buffer) => {
          socket.emit('ssh:data', data.toString())
        })

        shell.on('error', (err: Error) => {
          console.error('SSH Shell error:', err)
          socket.emit('ssh:error', err.message)
        })

        shell.on('close', () => {
          socket.emit('ssh:disconnected')
          sshConnections.delete(socket.id)
        })

        socket.on('ssh:data', (data: string) => {
          shell.write(data)
        })

        socket.on('ssh:resize', ({ cols, rows }: ResizeData) => {
          shell.setWindow(rows, cols)
        })
      } catch (error) {
        console.error('SSH connection error:', error)
        socket.emit('ssh:error', (error as Error).message)
      }
    })

    socket.on('disconnect', () => {
      const connection = sshConnections.get(socket.id)
      if (connection) {
        connection.dispose()
        sshConnections.delete(socket.id)
      }
    })
  })

  server
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, (err?: Error) => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
