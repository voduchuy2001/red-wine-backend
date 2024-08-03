import { body } from 'express-validator'

const createProductRequest = () => [
  body('name')
    .notEmpty()
    .bail()
    .withMessage('notEmpty')
    .isLength({ max: 200 })
    .bail()
    .withMessage('isLength', { max: 100 })
]

export default createProductRequest
