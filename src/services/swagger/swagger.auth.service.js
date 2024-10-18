import { UNAUTHORIZED } from '@constants/http.status.code'
import SWAGGER_ACCOUNT from '@constants/swagger.account'
import AuthException from '@exceptions/auth.exception'
import Bcrypt from '@utils/bcrypt'

class SwaggerAuthService {
  async login(data, req) {
    const { username, password } = data

    if (username !== SWAGGER_ACCOUNT.username) {
      throw new AuthException(UNAUTHORIZED, __('User not found'))
    }

    const matchedPassword = await Bcrypt.compare(password, SWAGGER_ACCOUNT.password)
    if (!matchedPassword) {
      throw new AuthException(UNAUTHORIZED, __('Password does not match'))
    }

    return (req.session.authenticated = true)
  }
}

export default SwaggerAuthService
