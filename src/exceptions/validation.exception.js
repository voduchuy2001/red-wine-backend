import HttpException from '@exceptions/http.exception'

class ValidationException extends HttpException {
  constructor(status = 400, message = __('Validation exception')) {
    super(status, message)
    this.message = message
  }
}

export default ValidationException
