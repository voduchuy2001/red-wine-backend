import UserRepository from '@repositories/user.repository'
import AuthException from '@exceptions/auth.exception'
import { FORBIDDEN, UNAUTHORIZED } from '@constants/http.status.code'
import ForbiddenException from '@exceptions/forbidden.exception'

const getPermissions = (user) => {
  const rolePermissions = user.roles.flatMap((role) => role.permissions.map((permission) => permission.code))
  const userPermissions = user.permissions.map((permission) => permission.code)
  return new Set([...rolePermissions, ...userPermissions])
}

const authorize =
  (permissions, option = 'every', userRepository = new UserRepository()) =>
  async (req, res, next) => {
    const { data: id } = req.auth

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
  }

export default authorize
