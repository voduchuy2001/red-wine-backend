import { body } from 'express-validator'

const verifyEmailRequest = [
  body('email').notEmpty().bail().withMessage('notEmpty').isEmail().bail().withMessage('isEmail'),

  body('otp').notEmpty().withMessage('Not empty').isString().withMessage('Must be a string')
]

export default verifyEmailRequest
