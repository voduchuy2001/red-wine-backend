import { body } from 'express-validator'

const swaggerRequest = () => [
  body('username').notEmpty().bail().withMessage('notEmpty'),

  body('password').notEmpty().bail().withMessage('notEmpty')
]

export default swaggerRequest
