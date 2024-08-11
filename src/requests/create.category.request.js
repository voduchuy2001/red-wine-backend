import CATEGORY_STATUS from '@constants/category.status'
import { body } from 'express-validator'

export const createCategoryRequest = [
  body('name').notEmpty().bail().withMessage('notEmpty').isLength({ max: 100 }).withMessage('tooLong'),

  body('status')
    .optional({ checkFalsy: true })
    .bail()
    .isString()
    .bail()
    .withMessage('isString')
    .isIn(CATEGORY_STATUS)
    .withMessage(`isIn ${Object.keys(CATEGORY_STATUS)}`),

  body('featured')
    .optional({ checkFalsy: true })
    .if(body('featured').notEmpty())
    .bail()
    .isInt()
    .bail()
    .withMessage('isInt'),

  body('order').optional({ checkFalsy: true }).bail().isInt().bail().withMessage('isInt')
]
