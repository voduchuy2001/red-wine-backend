import cookieSession from 'cookie-session'
import 'dotenv/config'

const session = cookieSession({
  keys: [process.env.SESSION_SECRET_KEY || 'red_wine'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
})

export default session
