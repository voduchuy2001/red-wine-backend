import { body } from 'express-validator'

export const createCategoryRequest = [
  body('name').notEmpty().bail().withMessage('Not empty').isLength({ max: 100 }).withMessage('Lte 100'),

  body('status')
    .optional({ checkFalsy: true })
    .bail()
    .isString()
    .bail()
    .withMessage('Must be a string')
    .isIn(['active', 'inactive'])
    .withMessage('Is in: active, inactive'),

  body('featured')
    .optional({ checkFalsy: true })
    .if(body('featured').notEmpty())
    .bail()
    .isInt()
    .bail()
    .withMessage('Must be a integer'),

  body('order').optional({ checkFalsy: true }).bail().isInt().bail().withMessage('Must be a integer')
]
