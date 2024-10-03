import logger from '@config/logging'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'
import MulterException from '@exceptions/multer.exception'
import { FILE_FILTER } from '@constants'

class ErrorHandler {
  handle(err, req, res, next) {
    logger.error(`Error: ${err.message}`)
    logger.error(`Stack: ${err.stack}`)

    if (err instanceof HttpException) {
      return res.status(err.status).json({ status: err.status, message: err.message })
    }

    if (err instanceof MulterException) {
      const message = FILE_FILTER[err.message] || 'An error occurred'
      return res.status(err.status || 400).json({ status: err.status || 400, message })
    }

    return res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: __('Internal Server Error')
    })
  }
}

export default new ErrorHandler()
