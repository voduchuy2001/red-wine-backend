import { query } from 'express-validator'

const getCategoriesRequest = [
  query('q')
    .optional()
    .isString()
    .withMessage('Must be a string')
    .isLength({ max: 120 })
    .withMessage('Less than 120 characters'),

  query('page').optional().isInt({ min: 1 }).withMessage('Must be at least 1'),

  query('pageSize').optional().isInt({ min: 1 }).withMessage('Must be at least 1'),

  query('filterBy').optional().isIn(['active', 'inactive']).withMessage('Only accepted: active, inactive'),

  query('sortBy').optional().isIn(['name', 'order', 'createdAt']).withMessage('Only accepted: name, order, createdAt'),

  query('order').optional().isIn(['desc', 'asc']).withMessage('Only accepted: desc, asc')
]

export default getCategoriesRequest