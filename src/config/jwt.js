import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '@constants/http.status.code'
import AuthException from '@exceptions/auth.exception'
import SystemException from '@exceptions/system.exception'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

class JWT {
  constructor() {
    const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env

    this.tokenKeys = {
      accessToken: ACCESS_TOKEN_KEY,
      refreshToken: REFRESH_TOKEN_KEY
    }

    if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
      throw new SystemException(INTERNAL_SERVER_ERROR, __('Token keys are not set in environment'))
    }
  }

  generate(data, expiresIn = '30m', type = 'accessToken') {
    const key = this.tokenKeys[type]

    if (!key) {
      throw new SystemException(INTERNAL_SERVER_ERROR, __('Not allowed token type'))
    }

    return jwt.sign({ data }, key, { expiresIn })
  }

  verify(token, type = 'accessToken') {
    const key = this.tokenKeys[type]

    if (!key) {
      throw new SystemException(INTERNAL_SERVER_ERROR, __('Not allowed token type'))
    }

    try {
      return jwt.verify(token, key)
    } catch (error) {
      const errorMessages = {
        JsonWebTokenError: __('Invalid token'),
        TokenExpiredError: __('Token has expired')
      }

      const message = errorMessages[error.name] || __('Authentication error')
      throw new AuthException(UNAUTHORIZED, message)
    }
  }
}

export default new JWT()
