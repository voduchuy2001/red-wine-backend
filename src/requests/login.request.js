import { MESSAGES } from '@constants/message'
import { body } from 'express-validator'

export const login = () => [
  body('email').notEmpty().bail().withMessage(MESSAGES.notEmpty).isEmail().bail().withMessage(MESSAGES.isEmail),

  body('password').notEmpty().bail().withMessage(MESSAGES.notEmpty).isString().bail().withMessage(MESSAGES.isString)
]
