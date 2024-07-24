import { body } from 'express-validator'

export const register = () => [
  body('email')
    .notEmpty()
    .bail()
    .withMessage('register.email.notEmpty')
    .isEmail()
    .bail()
    .withMessage('register.email.isEmail'),

  body('password').notEmpty().bail().withMessage('register.password.notEmpty')
]
