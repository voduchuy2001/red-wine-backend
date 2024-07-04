import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import routes from '@routes/v1'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { notFound } from '@middlewares/not.found'
import { logging } from '@config/logging'
import { socket } from '@config/socket.io'
import cors from 'cors'
import http from 'http'
import swaggerUiExpress from 'swagger-ui-express'
import { specs } from '@config/swagger'
import { view } from '@config/view'
import { filesystems } from '@config/filesystems'
import cookieParser from 'cookie-parser'
import { authenticated } from '@middlewares/swagger'
import { session } from '@config/session'

function bootstrap() {
  const app = express()
  const server = http.createServer(app)
  const io = socket(server)

  view(app)
  filesystems(app)
  app.use(cors())
  app.use(cookieParser())
  app.use(helmet())
  app.use(compression())
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(logging)
  app.set('trust proxy', 1)
  app.use(session)
  app.use('/api-docs', authenticated, swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
  app.use('/', routes)
  app.use(notFound)
  app.set('io', io)

  const host = process.env.APP_URL || 'localhost'
  const port = process.env.PORT || 6969
  server.listen(port, () => {
    console.log(`[http://${host}:${port}]`)
  })
}

bootstrap()
