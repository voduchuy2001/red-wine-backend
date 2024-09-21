import { UNPROCESSABLE_ENTITY } from '@constants/http.status.code'
import ValidationException from '@exceptions/validation.exception'
import { validationResult } from 'express-validator'

export const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)))

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().reduce((accumulator, { path, msg }) => {
      accumulator[path] = [...(accumulator[path] || []), msg]
      return accumulator
    }, {})

    Object.keys(errorMessages).forEach((path) => {
      errorMessages[path] = errorMessages[path].join('. ') + '.'
    })

    return next(new ValidationException(UNPROCESSABLE_ENTITY, errorMessages))
  }

  next()
}
