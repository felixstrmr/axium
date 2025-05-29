const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')
const { NodeSSH } = require('node-ssh')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Store SSH connections
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
    console.log('Client connected:', socket.id)
    let ssh = null

    socket.on('ssh:connect', async (connectionData) => {
      try {
        const { serverId, host, port, username, password, credentialId } =
          connectionData

        ssh = new NodeSSH()

        // Connect to SSH server
        await ssh.connect({
          host,
          port,
          username,
          password,
          tryKeyboard: true,
          // You might want to add more options here like privateKey support
        })

        // Store connection
        sshConnections.set(socket.id, ssh)

        // Create shell
        const shell = await ssh.requestShell({
          term: 'xterm-256color',
          cols: 80,
          rows: 24,
        })

        socket.emit('ssh:connected')

        // Handle data from SSH server
        shell.on('data', (data) => {
          socket.emit('ssh:data', data.toString())
        })

        // Handle SSH errors
        shell.on('error', (err) => {
          console.error('SSH Shell error:', err)
          socket.emit('ssh:error', err.message)
        })

        // Handle SSH close
        shell.on('close', () => {
          socket.emit('ssh:disconnected')
          sshConnections.delete(socket.id)
        })

        // Handle data from client
        socket.on('ssh:data', (data) => {
          shell.write(data)
        })

        // Handle terminal resize
        socket.on('ssh:resize', ({ cols, rows }) => {
          shell.setWindow(rows, cols)
        })
      } catch (error) {
        console.error('SSH connection error:', error)
        socket.emit('ssh:error', error.message)
      }
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)

      // Clean up SSH connection
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
