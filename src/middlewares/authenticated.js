import 'dotenv/config'
import { FORBIDDEN, UNAUTHORIZED } from '@constants/http.status.code'
import jwt from 'jsonwebtoken'
import UserRepository from '@repositories/user.repository'
import HttpHelper from '@utils/http'

export const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    return HttpHelper.json(res, UNAUTHORIZED, __('Missing token'))
  }

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET_KEY)
    next()
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return HttpHelper.json(res, UNAUTHORIZED, __('Token is invalid'))
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

    const userWithPermissions = await userRepository.getUserPermissions(id)

    if (!userWithPermissions) {
      return HttpHelper.json(res, UNAUTHORIZED, __('User not found'))
    }

    const allPermissions = getUserPermissions(userWithPermissions)
    const requiredPermissionsArray = Array.isArray(permissions) ? permissions : [permissions]

    const hadRequiredPermissions =
      option === 'every'
        ? requiredPermissionsArray.every((permission) => allPermissions.has(permission))
        : requiredPermissionsArray.some((permission) => allPermissions.has(permission))

    if (!hadRequiredPermissions) {
      return HttpHelper.json(res, FORBIDDEN, __('Forbidden'))
    }

    next()
  }
