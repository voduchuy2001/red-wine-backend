import BRAND_STATUS from '@constants/brand.status'
import { body } from 'express-validator'

const createBrandRequest = [
  body('name').notEmpty().withMessage('Not empty').isLength({ max: 200 }).withMessage('Lte 200'),

  body('website').optional().bail().isURL().bail().withMessage('Must be an url'),

  body('status')
    .notEmpty()
    .withMessage('Not empty')
    .isString()
    .withMessage('Must be a string')
    .isIn(Object.values(BRAND_STATUS))
    .withMessage(`Only accept: ${Object.values(BRAND_STATUS)}`),

  body('featured').optional({ checkFalsy: true }).bail().isBoolean().bail().withMessage('Must be boolean'),

  body('order').optional().isInt().withMessage('Must be an integer')
]

export default createBrandRequest
