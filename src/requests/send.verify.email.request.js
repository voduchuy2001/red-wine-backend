const { body } = require('express-validator')

const sendVerifyEmailRequest = [
  body('email').notEmpty().withMessage('Not empty').isEmail().withMessage('Must be an email')
]

export default sendVerifyEmailRequest
