import { body } from 'express-validator'

const refreshTokenRequest = [
  body('refreshToken').notEmpty().withMessage('Not empty').isJWT().withMessage('Must be type of JWT')
]

export default refreshTokenRequest
