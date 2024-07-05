import { CATEGORY_STATUS } from '@constants/category.status'
import { MESSAGES } from '@constants/message'
import { body, param, query } from 'express-validator'

export const index = () => [
  query('name').optional({ checkFalsy: true }).bail().isString().withMessage(MESSAGES.isString)
]

export const create = () => [
  body('name')
    .notEmpty()
    .bail()
    .withMessage(MESSAGES.notEmpty)
    .isLength({ max: 120 })
    .bail()
    .withMessage(MESSAGES.isLength(null, 120)),

  body('status')
    .isIn(Object.keys(CATEGORY_STATUS))
    .withMessage(MESSAGES.isIn(Object.keys(CATEGORY_STATUS))),

  body('image')
    .isString()
    .bail()
    .withMessage(MESSAGES.isString)
    .isLength({ max: 200 })
    .bail()
    .withMessage(MESSAGES.isLength(null, 200))
    .custom((link) => {
      if (!link.startsWith('http')) throw new Error(MESSAGES.invalidFormat)

      return true
    }),

  body('order').optional({ nullable: true, checkFalsy: true }).isInt().bail().withMessage(MESSAGES.isInt()),

  body('featured').optional({ nullable: true, checkFalsy: true }).isBoolean().bail().withMessage(MESSAGES.isBoolean)
]

export const show = () => [param('id').isInt({ min: 1 }).bail().withMessage(MESSAGES.isInt(1))]

export const update = () => [
  param('id').isInt({ min: 1 }).withMessage(MESSAGES.isInt(1)),

  body('name')
    .notEmpty()
    .bail()
    .withMessage(MESSAGES.notEmpty)
    .isLength({ max: 120 })
    .bail()
    .withMessage(MESSAGES.isLength(null, 120)),

  body('status')
    .isIn(Object.keys(CATEGORY_STATUS))
    .withMessage(MESSAGES.isIn(Object.keys(CATEGORY_STATUS))),

  body('image')
    .isString()
    .bail()
    .withMessage(MESSAGES.isString)
    .isLength({ max: 200 })
    .bail()
    .withMessage(MESSAGES.isLength(null, 200))
    .custom((link) => {
      if (!link.startsWith('http')) throw new Error(MESSAGES.invalidFormat)

      return true
    }),

  body('order').optional({ nullable: true, checkFalsy: true }).isInt().bail().withMessage(MESSAGES.isInt()),

  body('featured').optional({ nullable: true, checkFalsy: true }).isBoolean().bail().withMessage(MESSAGES.isBoolean)
]

export const destroy = () => [param('id').isInt({ min: 1 }).withMessage(MESSAGES.isInt(1))]
