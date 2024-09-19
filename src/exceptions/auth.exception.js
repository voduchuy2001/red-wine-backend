import HttpException from '@exceptions/http.exception'

export default class AuthException extends HttpException {
  constructor(status = 400, message = __('Auth exception')) {
    super(status, message)
  }
}
