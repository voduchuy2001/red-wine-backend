import { MESSAGES } from '@constants/message'
import { body } from 'express-validator'

export const vnpSetting = () => [
  body('value').isObject().withMessage(MESSAGES.isObject),

  body('value.enabled')
    .notEmpty()
    .withMessage(MESSAGES.notEmpty)
    .isBoolean({ strict: true })
    .withMessage(MESSAGES.isBoolean),

  body('value.vnp_TmnCode')
    .if((value, { req }) => req.body.value.enabled === true)
    .notEmpty()
    .bail()
    .withMessage(MESSAGES.notEmpty)
    .isString()
    .bail()
    .withMessage(MESSAGES.isString)
    .isLength({ max: 120 })
    .withMessage(MESSAGES.isLength(null, 120)),

  body('value.vnp_HashSecret')
    .if((value, { req }) => req.body.value.enabled === true)
    .notEmpty()
    .bail()
    .withMessage(MESSAGES.notEmpty)
    .isString()
    .bail()
    .withMessage(MESSAGES.isString)
    .isLength({ max: 120 })
    .withMessage(MESSAGES.isLength(null, 120))
]
