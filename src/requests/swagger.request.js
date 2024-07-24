import { body } from 'express-validator'

export const swagger = () => [
  body('username').notEmpty().bail().withMessage('swagger.username.notEmpty'),

  body('password').notEmpty().bail().withMessage('swagger.password.notEmpty')
]
