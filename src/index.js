import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import routes from '@routes/v1'
import helmet from 'helmet'
import compression from 'compression'
import { notFound } from '@middlewares/not.found'
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
import { multer } from '@middlewares/multer'
import i18n from '@config/lang'
import lang from '@middlewares/lang'
import { morganMiddleware } from '@middlewares/morgan'
import errorHandler from '@middlewares/error.handler'

async function bootstrap() {
  const app = express()
  const server = http.createServer(app)
  const io = socket(server)

  view(app)
  filesystems(app)
  app.use(morganMiddleware)
  app.use(cors())
  app.use(cookieParser())
  app.use(helmet())
  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.set('trust proxy', 1)
  app.use(i18n.init)
  app.use(lang)
  app.use(session)
  app.use('/api-docs', authenticated, swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
  app.use('/', routes)
  app.use(errorHandler)
  app.use(multer)
  app.use(notFound)
  app.set('io', io)

  const host = process.env.APP_URL || 'localhost'
  const port = process.env.PORT || 6969
  server.listen(port, () => {
    console.log(`[http://${host}:${port}]`)
  })
}

bootstrap()
