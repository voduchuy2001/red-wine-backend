import { body } from 'express-validator'

export const register = () => [
  body('email').notEmpty().bail().withMessage('notEmpty').isEmail().bail().withMessage('isEmail'),

  body('password').notEmpty().bail().withMessage('notEmpty')
]
