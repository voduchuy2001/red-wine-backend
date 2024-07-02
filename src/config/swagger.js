import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import 'dotenv/config'

const port = process.env.PORT || 6969
const swaggerDefinition = {
  info: {
    title: 'API Red Wine',
    version: '1.0.0',
    description: 'API Documentation'
  },
  host: `${process.env.APP_URL}:${port}`
}

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../documents/**/*.yaml')]
}

export const specs = swaggerJsdoc(options)
