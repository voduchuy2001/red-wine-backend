import { body } from 'express-validator'

const registerRequest = () => [
  body('email').notEmpty().bail().withMessage('notEmpty').isEmail().bail().withMessage('isEmail'),

  body('password').notEmpty().bail().withMessage('notEmpty')
]

export default registerRequest
