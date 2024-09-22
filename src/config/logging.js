import winston from 'winston'
import path from 'path'
import fs from 'fs'

const logDirectory = path.join(__dirname, '../storage/logs')
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true })
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: path.join(logDirectory, 'error.log'),
    level: 'error'
  }),
  new winston.transports.File({ filename: path.join(logDirectory, 'system.log') })
]

export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
})
