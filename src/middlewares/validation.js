import { UNPROCESSABLE_ENTITY } from '@constants/http.status.code'
import HttpHelper from '@utils/http'
import { validationResult } from 'express-validator'

export const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)))

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const errorMessages = errors.array().reduce((accumulator, { path, msg }) => {
    accumulator[path] = [...(accumulator[path] || []), __(msg)]
    return accumulator
  }, {})

  Object.keys(errorMessages).forEach((path) => {
    errorMessages[path] = errorMessages[path] + '.'
  })

  return HttpHelper.errorResponse(res, UNPROCESSABLE_ENTITY, errorMessages)
}
