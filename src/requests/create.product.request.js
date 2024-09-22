import { body } from 'express-validator'

const createProductRequest = [
  body('name')
    .notEmpty()
    .bail()
    .withMessage('notEmpty')
    .isLength({ max: 200 })
    .bail()
    .withMessage('isLength', { max: 100 }),

  body('description').optional({ checkFalsy: true }).bail().isString().bail().withMessage('isString'),

  body('sku')
    .notEmpty()
    .bail()
    .withMessage('notEmpty')
    .isString()
    .bail()
    .withMessage('isString')
    .isLength({ max: 120 })
    .withMessage('tooLong'),

  body('price').isNumeric().notEmpty(),

  body('quantity').isNumeric().notEmpty(),

  body('brandId').isNumeric().notEmpty(),

  body('categoryIds').optional().isArray(),

  body('optionValues').optional().isArray(),

  body('mediaUrls').optional().isArray()
]

export default createProductRequest
