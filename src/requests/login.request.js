import { body } from 'express-validator'

const loginRequest = () => [
  body('email').notEmpty().bail().withMessage('notEmpty').isEmail().bail().withMessage('isEmail'),

  body('password').notEmpty().bail().withMessage('notEmpty')
]

export default loginRequest
