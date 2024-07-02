import { NOT_FOUND } from '@constants/http.status.code'
import HttpHelper from '@utils/http'

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  HttpHelper.errorResponse(res, NOT_FOUND, error.message)
  next(error.message)
}
