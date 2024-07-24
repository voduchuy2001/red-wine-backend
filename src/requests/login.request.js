import { body } from 'express-validator'

export const login = () => [
  body('email')
    .notEmpty()
    .bail()
    .withMessage('login.email.notEmpty')
    .isEmail()
    .bail()
    .withMessage('login.email.isEmail'),

  body('password').notEmpty().bail().withMessage('login.password.notEmpty')
]
