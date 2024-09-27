import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import routes from '@routes/v1'
import helmet from 'helmet'
import compression from 'compression'
import notFound from '@middlewares/not.found'
import cors from 'cors'
import http from 'http'
import swaggerUiExpress from 'swagger-ui-express'
import { specs } from '@config/swagger'
import { view } from '@config/view'
import { filesystems } from '@config/filesystems'
import cookieParser from 'cookie-parser'
import { authenticated } from '@middlewares/swagger'
import { session } from '@config/session'
import multer from '@middlewares/multer'
import i18n from '@config/lang'
import lang from '@middlewares/lang'
import errorHandler from '@middlewares/error.handler'
import { socketIo } from '@config/socket.io'

async function bootstrap() {
  const app = express()
  const server = http.createServer(app)
  const io = socketIo.getServer()
  io.listen(server)

  view(app)
  filesystems(app)
  app.use(multer)
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
  app.use('/v1', routes)
  app.use(notFound)
  app.use(errorHandler)

  const version = process.env.VERSION || 'v1'
  const host = process.env.APP_URL || 'localhost'
  const port = process.env.PORT || 6969
  server.listen(port, () => {
    console.log(`${host}:${port}/${version}`)
  })
}

bootstrap()
