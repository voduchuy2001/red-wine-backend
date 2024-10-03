import { UNAUTHORIZED } from '@constants/index'
import JWT from '@config/jwt'
import AuthException from '@exceptions/auth.exception'

const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    return next(new AuthException(UNAUTHORIZED, __('Missing token')))
  }

  try {
    req.auth = JWT.verify(token, 'accessToken')
    next()
  } catch (error) {
    return next(new AuthException(UNAUTHORIZED, error.message))
  }
}

export default auth
