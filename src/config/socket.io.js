import { Server } from 'socket.io'

class SocketIO {
  constructor() {
    this.io = new Server({
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
      }
    })

    this.initialize()
  }

  initialize() {
    this.io.on('connection', (socket) => {
      console.log(`Socket ${socket.id} connected`)

      socket.on('disconnect', (reason) => {
        console.log(`Socket ${socket.id} disconnected due to ${reason}`)
      })

      this.registerEvents(socket)
    })
  }

  // eslint-disable-next-line no-unused-vars
  registerEvents(socket) {}

  getServer() {
    return this.io
  }
}

export const socketIo = new SocketIO()
