import { body } from 'express-validator'

const updateCategoryRequest = [
  body('name').notEmpty().bail().withMessage('Not empty').isLength({ max: 100 }).withMessage('Lte 100'),

  body('status')
    .notEmpty()
    .withMessage('Not empty')
    .isString()
    .withMessage('Must be a string')
    .isIn(['published', 'draft', 'pending'])
    .withMessage('Is in: published, draft, pending'),

  body('featured').optional({ checkFalsy: true }).bail().isBoolean().bail().withMessage('Must be boolean'),

  body('order').optional({ checkFalsy: true }).bail().isInt().bail().withMessage('Must be a integer')
]

export default updateCategoryRequest
