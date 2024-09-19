import { logger } from '@config/logging'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import HttpHelper from '@utils/http'
import HttpException from '@exceptions/http.exception'

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`)
  logger.error(`Stack: ${err.stack}`)

  if (err instanceof HttpException) {
    return HttpHelper.json(res, err.status, err.message)
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: __('Internal Server Error') })
}

export default errorHandler
