import path from 'path'
import fs from 'fs'
import morgan from 'morgan'

const logDirectory = path.join(__dirname, '../storage/logs')

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true })
}

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'http.log'), { flags: 'a' })

export const morganMiddleware =
  process.env.LOGGING === 'file' ? morgan('combined', { stream: accessLogStream }) : morgan('dev')