import { body } from 'express-validator'

const swaggerRequest = [
  body('username').notEmpty().bail().withMessage('Not empty'),

  body('password').notEmpty().bail().withMessage('Not empty')
]

export default swaggerRequest
