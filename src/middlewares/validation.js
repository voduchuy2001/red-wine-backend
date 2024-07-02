import { UNPROCESSABLE_ENTITY } from '@constants/http.status.code'
import HttpHelper from '@utils/http'
import { validationResult } from 'express-validator'

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    return HttpHelper.errorResponse(res, UNPROCESSABLE_ENTITY, errors.array())
  }
}
