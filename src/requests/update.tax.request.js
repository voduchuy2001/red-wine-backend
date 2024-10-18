import { body } from 'express-validator'

const updateTaxRequest = [
  body('title').notEmpty().bail().withMessage('Not empty').isLength({ max: 100 }).withMessage('Lte 100'),

  body('percentage').notEmpty().withMessage('Not empty').isFloat({ min: 0, max: 100 }).withMessage('Float 1-100'),

  body('priority').optional({ checkFalsy: true }).bail().isBoolean().bail().withMessage('Must be boolean'),

  body('status')
    .notEmpty()
    .withMessage('Not empty')
    .isString()
    .withMessage('Must be a string')
    .isIn(['published', 'draft', 'pending'])
    .withMessage('Is in: published, draft, pending')
]

export default updateTaxRequest
