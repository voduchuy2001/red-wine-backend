import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import 'dotenv/config'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 6969
const version = process.env.VERION || 'v1'

const swaggerDefinition = {
  info: {
    title: 'API Red Wine',
    version: '1.0.0',
    description: 'API Documentation'
  },
  host: `${host}:${port}/${version}`
}

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../documents/**/*.yaml')]
}

export const specs = swaggerJsdoc(options)
