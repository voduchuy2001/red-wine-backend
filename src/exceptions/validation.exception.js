import { UNPROCESSABLE_ENTITY } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

class ValidationException extends HttpException {
  constructor(status = UNPROCESSABLE_ENTITY, message = __('Validation exception')) {
    super(status, message)
    this.message = message
  }
}

export default ValidationException
