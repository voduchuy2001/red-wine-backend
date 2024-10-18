import { body } from 'express-validator'

const registerRequest = [
  body('email').notEmpty().bail().withMessage('notEmpty').isEmail().bail().withMessage('isEmail'),

  body('password')
    .notEmpty()
    .bail()
    .withMessage('notEmpty')
    .isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage(
      'Your password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol'
    )
]

export default registerRequest
