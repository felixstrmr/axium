const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')
const { NodeSSH } = require('node-ssh')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const sshConnections = new Map()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server, {
    path: '/api/ssh/socket',
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    let ssh = null

    socket.on('ssh:connect', async (connectionData) => {
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
        shell.on('data', (data) => {
          socket.emit('ssh:data', data.toString())
        })

        shell.on('error', (err) => {
          console.error('SSH Shell error:', err)
          socket.emit('ssh:error', err.message)
        })

        shell.on('close', () => {
          socket.emit('ssh:disconnected')
          sshConnections.delete(socket.id)
        })

        socket.on('ssh:data', (data) => {
          shell.write(data)
        })

        socket.on('ssh:resize', ({ cols, rows }) => {
          shell.setWindow(rows, cols)
        })
      } catch (error) {
        console.error('SSH connection error:', error)
        const errorMessage = error.message.includes(
          'All configured authentication methods failed',
        )
          ? 'Authentication failed: Please check your username and password'
          : error.message
        socket.emit('ssh:error', errorMessage)
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

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
