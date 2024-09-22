import HttpException from '@exceptions/http.exception'

class AuthException extends HttpException {
  constructor(status = 400, message = __('Auth exception')) {
    super(status, message)
  }
}

export default AuthException
