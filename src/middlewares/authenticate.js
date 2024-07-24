import 'dotenv/config'
import { FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '@constants/http.status.code'
import HttpHelper from '@utils/http'
import jwt from 'jsonwebtoken'
import UserRepository from '@repositories/user.repository'

export const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) return HttpHelper.json(res, UNAUTHORIZED, __('http.missingToken'))

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.auth = payload
    next()
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return HttpHelper.json(res, UNAUTHORIZED, __('http.invalidToken'))
  }
}

const getUserPermissions = (user) => {
  const userRoleHasPermissions = user.roles.flatMap((role) => role.permissions.map((permission) => permission.code))
  const userHasPermissions = user.permissions.map((permission) => permission.code)
  return [...userRoleHasPermissions, ...userHasPermissions]
}

export const authorize = (permissions) => async (req, res, next) => {
  const { data: userId } = req.auth

  try {
    const userRepository = new UserRepository()
    const userWithPermissions = await userRepository.getAllPermissions(userId)
    if (!userWithPermissions) return HttpHelper.json(res, UNAUTHORIZED, __('authorize.user.notFound'))

    const allPermissions = getUserPermissions(userWithPermissions)

    const requiredPermissionsArray = Array.isArray(permissions) ? permissions : [permissions]
    const hadRequiredPermissions = requiredPermissionsArray.every((permission) => allPermissions.includes(permission))

    if (!hadRequiredPermissions) return HttpHelper.json(res, FORBIDDEN, __('http.forbidden'))

    next()
  } catch (error) {
    return HttpHelper.json(res, INTERNAL_SERVER_ERROR, __('http.internalServerError'), error.message)
  }
}
