import 'dotenv/config'
import { FORBIDDEN, UNAUTHORIZED } from '@constants/http.status.code'
import HttpHelper from '@utils/http'
import jwt from 'jsonwebtoken'
import UserRepository from '@repositories/user.repository'

export const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    return HttpHelper.json(res, UNAUTHORIZED, __('Missing token'))
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.auth = payload
    next()
  } catch (error) {
    next(error)
  }
}

const getUserPermissions = (user) => {
  const rolePermissions = user.roles.flatMap((role) => role.permissions.map((permission) => permission.code))
  const userPermissions = user.permissions.map((permission) => permission.code)
  return new Set([...rolePermissions, ...userPermissions])
}

export const hasPermission = (permissions) => async (req, res, next) => {
  const { data: userId } = req.auth

  try {
    const userRepository = new UserRepository()
    const userWithPermissions = await userRepository.getAllPermissions(userId)

    if (!userWithPermissions) {
      return HttpHelper.json(res, UNAUTHORIZED, __('User not found'))
    }

    const allPermissions = getUserPermissions(userWithPermissions)
    const requiredPermissionsArray = Array.isArray(permissions) ? permissions : [permissions]

    const hadRequiredPermissions = requiredPermissionsArray.every((permission) => allPermissions.includes(permission))

    if (!hadRequiredPermissions) {
      return HttpHelper.json(res, FORBIDDEN, __('Forbidden'))
    }

    next()
  } catch (error) {
    next(error)
  }
}

export const hasAnyPermission = (permissions) => async (req, res, next) => {
  const { data: userId } = req.auth

  try {
    const userRepository = new UserRepository()
    const userWithPermissions = await userRepository.getAllPermissions(userId)

    if (!userWithPermissions) {
      return HttpHelper.json(res, UNAUTHORIZED, __('User not found'))
    }

    const allPermissions = getUserPermissions(userWithPermissions)
    const requiredPermissionsArray = Array.isArray(permissions) ? permissions : [permissions]

    const hadRequiredPermissions = requiredPermissionsArray.some((permission) => allPermissions.includes(permission))

    if (!hadRequiredPermissions) {
      return HttpHelper.json(res, FORBIDDEN, __('Forbidden'))
    }

    next()
  } catch (error) {
    next(error)
  }
}

export const hasRole = (roles) => async (req, res, next) => {
  const { data: userId } = req.auth

  try {
    next()
  } catch (error) {
    next(error)
  }
}
