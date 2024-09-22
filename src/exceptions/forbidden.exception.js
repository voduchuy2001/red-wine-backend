import HttpException from '@exceptions/http.exception'

class ForbiddenException extends HttpException {
  constructor(status = 400, message = __('Forbidden exception')) {
    super(status, message)
  }
}

export default ForbiddenException
