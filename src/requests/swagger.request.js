import { body } from 'express-validator'

export const swagger = () => [
  body('username').notEmpty().bail().withMessage('notEmpty'),

  body('password').notEmpty().bail().withMessage('notEmpty')
]
