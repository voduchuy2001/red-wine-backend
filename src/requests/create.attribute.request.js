import { body } from 'express-validator'

const createAttributeRequest = [
  body('name').notEmpty().withMessage('Not empty').isLength({ max: 120 }).withMessage('Lte 120'),

  body('description').optional({ checkFalsy: true }).isLength({ max: 1000 }).withMessage('Lte 1000'),

  body('isVisible').optional({ checkFalsy: true }).bail().isBoolean().bail().withMessage('Must be boolean')
]

export default createAttributeRequest
