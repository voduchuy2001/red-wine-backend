import { body } from 'express-validator'

export const vnpSetting = [
  body('value').isObject().withMessage('isObject'),

  body('value.enabled').notEmpty().withMessage('notEmpty').isBoolean({ strict: true }).withMessage('isBoolean'),

  body('value.vnp_TmnCode')
    .if((value, { req }) => req.body.value.enabled === true)
    .notEmpty()
    .bail()
    .withMessage('notEmpty')
    .isString()
    .bail()
    .withMessage('isString')
    .isLength({ max: 120 })
    .withMessage('isLength'),

  body('value.vnp_HashSecret')
    .if((value, { req }) => req.body.value.enabled === true)
    .notEmpty()
    .bail()
    .withMessage('notEmpty')
    .isString()
    .bail()
    .withMessage('isString')
    .isLength({ max: 120 })
    .withMessage('isLength')
]
