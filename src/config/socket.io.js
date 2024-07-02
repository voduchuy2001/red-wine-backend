import socketIO from 'socket.io'

export const socket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  })

  io.on('connection', (socket) => {
    console.log('A user has just connected!')

    socket.on('disconnect', () => {
      console.log('A user has just disconnected!')
    })
  })

  return io
}
