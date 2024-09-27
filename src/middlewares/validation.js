import { UNPROCESSABLE_ENTITY } from '@constants/http.status.code'
import ValidationException from '@exceptions/validation.exception'
import { validationResult } from 'express-validator'

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)))

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const messages = errors.array().reduce((accumulator, { path, msg }) => {
      accumulator[path] = [...(accumulator[path] || []), msg]
      return accumulator
    }, {})

    Object.keys(messages).forEach((path) => {
      messages[path] = messages[path].join('. ') + '.'
    })

    return next(new ValidationException(UNPROCESSABLE_ENTITY, messages))
  }

  next()
}

export default validate
