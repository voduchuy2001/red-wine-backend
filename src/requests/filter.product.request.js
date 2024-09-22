import { query } from 'express-validator'

const productFilterRequest = [
  query('page').optional({ nullable: true, checkFalsy: true }).bail().isInt({ min: 1 }),

  query('limit').optional({ nullable: true, checkFalsy: true }).bail().isInt({ min: 1 }),

  query('q').optional({ checkFalsy: true }).bail().isString()
]

export default productFilterRequest
