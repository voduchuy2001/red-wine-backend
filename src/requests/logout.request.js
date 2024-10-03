import { body } from 'express-validator'

const logoutRequest = [
  body('refreshToken').notEmpty().withMessage('Not empty').isJWT().withMessage('Must be type of JWT')
]

export default logoutRequest