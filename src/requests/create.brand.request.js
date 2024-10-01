import BRAND_STATUS from '@constants/brand.status'
import { body } from 'express-validator'

const createBrandRequest = [
  body('name').notEmpty().withMessage('Not empty').isLength({ max: 200 }).withMessage('Max 200'),

  body('website').optional().bail().isURL().bail().withMessage('Must be an url'),

  body('status')
    .optional()
    .isString()
    .withMessage('isString')
    .isIn(Object.values(BRAND_STATUS))
    .withMessage(`Only accept: ${Object.values(BRAND_STATUS)}`),

  body('featured').optional().if(body('featured').notEmpty()).isInt().withMessage('Integer'),

  body('order').optional().isInt().withMessage('Integer')
]

export default createBrandRequest
