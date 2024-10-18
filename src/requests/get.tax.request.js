import { query } from 'express-validator'

const getTaxRequest = [
  query('q')
    .optional()
    .isString()
    .withMessage('Must be a string')
    .isLength({ max: 120 })
    .withMessage('Less than 120 characters'),

  query('page').optional().isInt({ min: 1 }).withMessage('Must be at least 1'),

  query('pageSize').optional().isInt({ min: 1 }).withMessage('Must be at least 1'),

  query('filterBy')
    .optional({ checkFalsy: true })
    .isIn(['published', 'pending', 'draft'])
    .withMessage('Only accepted: published, pending, draft'),

  query('sortBy').optional().isIn(['name', 'order', 'createdAt']).withMessage('Only accepted: name, order, createdAt'),

  query('order').optional().isIn(['desc', 'asc']).withMessage('Only accepted: desc, asc')
]

export default getTaxRequest
