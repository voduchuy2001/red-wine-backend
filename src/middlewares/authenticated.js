import 'dotenv/config'
import { FORBIDDEN, UNAUTHORIZED } from '@constants/http.status.code'
import jwt from 'jsonwebtoken'
import UserRepository from '@repositories/user.repository'
import AuthException from '@exceptions/auth.exception'
import ForbiddenException from '@exceptions/forbidden.exception'

export const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    throw new AuthException(UNAUTHORIZED, __('Missing token'))
  }

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET_KEY)
    next()
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new AuthException(UNAUTHORIZED, __('Invalid token'))
  }
}

const getUserPermissions = (user) => {
  const rolePermissions = user.roles.flatMap((role) => role.permissions.map((permission) => permission.code))
  const userPermissions = user.permissions.map((permission) => permission.code)
  return new Set([...rolePermissions, ...userPermissions])
}

export const authorize =
  (permissions, option = 'every', userRepository = new UserRepository()) =>
  async (req, res, next) => {
    const { data: id } = req.auth

    try {
      const userWithPermissions = await userRepository.getUserPermissions(id)

      if (!userWithPermissions) {
        throw new AuthException(UNAUTHORIZED, __('Not found user'))
      }

      const allPermissions = getUserPermissions(userWithPermissions)
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
