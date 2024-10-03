import logger from '@config/logging'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

const handleError = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`)
  logger.error(`Stack: ${err.stack}`)

  if (err instanceof HttpException) {
    return res.status(err.status).json({ status: err.status, message: err.message })
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ status: INTERNAL_SERVER_ERROR, message: __('Internal Server Error') })
}

export default handleError
