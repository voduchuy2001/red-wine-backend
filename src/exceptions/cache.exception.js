import { BAD_REQUEST } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

class CacheException extends HttpException {
  constructor(status = BAD_REQUEST, message = __('Cache exception')) {
    super(status, message)
  }
}

export default CacheException
