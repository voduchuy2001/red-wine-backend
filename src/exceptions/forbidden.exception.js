import { FORBIDDEN } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

class ForbiddenException extends HttpException {
  constructor(status = FORBIDDEN, message = __('Forbidden exception')) {
    super(status, message)
  }
}

export default ForbiddenException
