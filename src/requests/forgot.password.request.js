const { body } = require('express-validator')

const forgotPasswordRequest = [
  body('email').notEmpty().withMessage('Not empty').isEmail().withMessage('Must be an email')
]

export default forgotPasswordRequest
