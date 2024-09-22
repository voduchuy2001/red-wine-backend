import BRAND_STATUS from '@constants/brand.status'
import { body } from 'express-validator'

const createBrandRequest = [
  body('name')
    .notEmpty()
    .bail()
    .withMessage('notEmpty')
    .isLength({ max: 200 })
    .bail()
    .withMessage('isLength', { max: 100 }),

  body('logo').optional({ checkFalsy: true }).bail().isURL().bail().withMessage('isURL'),

  body('website').optional({ checkFalsy: true }).bail().isURL().bail().withMessage('isURL'),

  body('status')
    .optional({ checkFalsy: true })
    .bail()
    .isString()
    .bail()
    .withMessage('isString')
    .isIn(BRAND_STATUS)
    .withMessage(`isIn ${Object.keys(BRAND_STATUS)}`),

  body('featured')
    .optional({ checkFalsy: true })
    .if(body('featured').notEmpty())
    .bail()
    .isInt()
    .bail()
    .withMessage('isInt'),

  body('order').optional({ checkFalsy: true }).bail().isInt().bail().withMessage('isInt')
]

export default createBrandRequest
