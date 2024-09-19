import { logger } from '@config/logging'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import HttpHelper from '@utils/http'

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`)
  logger.error(`Stack: ${err.stack}`)

  return HttpHelper.json(res, INTERNAL_SERVER_ERROR, __('Internal Server Error'))
}

export default errorHandler
