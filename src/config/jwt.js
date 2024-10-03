import { UNAUTHORIZED } from '@constants/http.status.code'
import AuthException from '@exceptions/auth.exception'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

class JWT {
  tokenTypes() {
    return {
      accessToken: process.env.ACCESS_TOKEN_KEY,
      refreshToken: process.env.REFRESH_TOKEN_KEY
    }
  }

  generate(data, expiresIn = '15m', type = 'accessToken') {
    const types = this.tokenTypes()
    return jwt.sign({ data }, types[type], { expiresIn })
  }

  verify(token, type = 'accessToken') {
    const types = this.tokenTypes()

    try {
      return jwt.verify(token, types[type])
    } catch (error) {
      const messages = {
        JsonWebTokenError: __('Invalid token'),
        TokenExpiredError: __('Token has expired')
      }

      const message = messages[error.name] || __('Authentication error')
      throw new AuthException(UNAUTHORIZED, message)
    }
  }
}

export default new JWT()
