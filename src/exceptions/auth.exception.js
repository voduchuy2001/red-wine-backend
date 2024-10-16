import { UNAUTHORIZED } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

class AuthException extends HttpException {
  constructor(status = UNAUTHORIZED, message = __('Auth exception')) {
    super(status, message)
  }
}

export default AuthException
