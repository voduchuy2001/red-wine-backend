import { query } from 'express-validator'

export const productFilterRequest = () => [
  query('page').optional({ nullable: true, checkFalsy: true }).bail().isInt({ min: 1 }).withMessage('isInteger'),

  query('limit').optional({ nullable: true, checkFalsy: true }).bail().isInt({ min: 1 }).withMessage('isInteger'),

  query('q').optional({ checkFalsy: true }).bail().isString().withMessage('isString')
]
