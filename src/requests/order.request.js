import { MESSAGES } from '@constants/message'
import { body } from 'express-validator'

export const create = () => [
  body('note')
    .optional({ checkFalsy: true })
    .bail()
    .isString()
    .bail()
    .withMessage(MESSAGES.isString)
    .isLength({ max: 200 })
    .withMessage(MESSAGES.isLength(null, 200)),

  body('phone').notEmpty().bail().withMessage(MESSAGES.notEmpty)
]
