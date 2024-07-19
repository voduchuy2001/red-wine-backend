import 'dotenv/config'
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'
import jwt from 'jsonwebtoken'
import { userRepository } from '@di/container'

export const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) return HttpHelper.errorResponse(res, UNAUTHORIZED, MESSAGES.missingToken)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.auth = payload
    next()
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return HttpHelper.errorResponse(res, UNAUTHORIZED, MESSAGES.invalidToken)
  }
}

const userPermissions = (user) => {
  const userRoleHasPermissions = user.roles.flatMap((role) => role.permissions.map((permission) => permission.code))
  const userHasPermissions = user.permissions.map((permission) => permission.code)
  return [...userRoleHasPermissions, ...userHasPermissions]
}

export const authorize = (permissions) => async (req, res, next) => {
  const { data: userId } = req.auth

  try {
    const user = await userRepository.getAllPermissions(userId)
    if (!user) return HttpHelper.errorResponse(res, BAD_REQUEST, MESSAGES.notFound)

    const allPermissions = userPermissions(user)

    const requiredPermissionsArray = Array.isArray(permissions) ? permissions : [permissions]
    const hadRequiredPermissions = requiredPermissionsArray.every((permission) => allPermissions.includes(permission))

    if (!hadRequiredPermissions) return HttpHelper.errorResponse(res, FORBIDDEN, MESSAGES.forbidden)

    next()
  } catch (error) {
    return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
  }
}
