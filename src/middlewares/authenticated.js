import 'dotenv/config'
import { FORBIDDEN, UNAUTHORIZED } from '@constants/http.status.code'
import jwt from 'jsonwebtoken'
import UserRepository from '@repositories/user.repository'
import AuthException from '@exceptions/auth.exception'
import ForbiddenException from '@exceptions/forbidden.exception'

const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    throw new AuthException(UNAUTHORIZED, __('Missing token'))
  }

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET_KEY)
    next()
  } catch (error) {
    const messages = {
      JsonWebTokenError: __('Invalid token'),
      TokenExpiredError: __('Token has expired')
    }

    const message = messages[error.name] || __('Authentication error')
    return next(new AuthException(UNAUTHORIZED, message))
  }
}

const getPermissions = (user) => {
  const rolePermissions = user.roles.flatMap((role) => role.permissions.map((permission) => permission.code))
  const userPermissions = user.permissions.map((permission) => permission.code)
  return new Set([...rolePermissions, ...userPermissions])
}

const authorize =
  (permissions, option = 'every', userRepository = new UserRepository()) =>
  async (req, res, next) => {
    const { data: id } = req.auth

    try {
      const userWithPermissions = await userRepository.getPermissions(id)

      if (!userWithPermissions) {
        throw new AuthException(UNAUTHORIZED, __('Not found user'))
      }

      const allPermissions = getPermissions(userWithPermissions)
      const requiredPermissionsArray = Array.isArray(permissions) ? permissions : [permissions]

      const hadRequiredPermissions =
        option === 'every'
          ? requiredPermissionsArray.every((permission) => allPermissions.has(permission))
          : requiredPermissionsArray.some((permission) => allPermissions.has(permission))

      if (!hadRequiredPermissions) {
        throw new ForbiddenException(FORBIDDEN, __('Forbidden'))
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export { auth, authorize }
