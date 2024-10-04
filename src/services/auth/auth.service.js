import { generateAvatar } from '@utils/avatar'
import Bcrypt from '@utils/bcrypt'
import JWT from '@config/jwt'
import ServiceException from '@exceptions/service.exception'
import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from '@constants/http.status.code'
import RedisCache from '@config/cache'
import { v4 as uuidv4 } from 'uuid'

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async validateEmail(email) {
    return this.userRepository.findByEmail(email)
  }

  async validatePassword(inputPassword, userPassword) {
    return Bcrypt.comparePassword(inputPassword, userPassword)
  }

  async login(data) {
    const { email, password } = data

    const user = await this.validateEmail(email)
    if (!user) {
      throw new ServiceException(UNAUTHORIZED, __('User not found'))
    }

    const userPassword = user.password
    const matchedPassword = await this.validatePassword(password, userPassword)
    if (!matchedPassword) {
      throw new ServiceException(UNAUTHORIZED, __('Password does not match'))
    }

    const userId = user.id
    await this.userRepository.updateLastLoginAt(userId)
    const accessToken = JWT.generate(userId, '15m')

    const sessionId = 'session-' + uuidv4()
    const refreshToken = JWT.generate({ userId, sessionId }, '7d', 'refreshToken')
    await RedisCache.set(`auth:user:${userId}:${sessionId}`, refreshToken, 7 * 24 * 60 * 60)

    return { accessToken, refreshToken }
  }

  async register(data) {
    const { email, password } = data

    const existedUser = await this.validateEmail(email)
    if (existedUser) {
      throw new ServiceException(BAD_REQUEST, __('Email has been already exist'))
    }

    const hashedPassword = await Bcrypt.hashPassword(password)
    const avatar = generateAvatar(email, 200) || null
    return await this.userRepository.create({ email, avatar, password: hashedPassword })
  }

  async logout(refreshToken) {
    try {
      const decoded = JWT.verify(refreshToken, 'refreshToken')
      const { userId, sessionId } = decoded.data
      const existRefreshToken = await RedisCache.get(`auth:user:${userId}:${sessionId}`)

      if (!existRefreshToken) {
        throw new ServiceException(NOT_FOUND, __('Refresh token not found'))
      }

      await RedisCache.del(`auth:user:${userId}:${sessionId}`)

      return true
    } catch (error) {
      throw new ServiceException(error.status || UNAUTHORIZED, error.message)
    }
  }

  async auth(id) {
    const authUser = await this.userRepository.auth(id)
    if (!authUser) {
      throw new ServiceException(NOT_FOUND, __('Not found user'))
    }
    return authUser
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = JWT.verify(refreshToken, 'refreshToken')
      const { userId, sessionId } = decoded.data

      const existRefreshToken = await RedisCache.get(`auth:user:${userId}:${sessionId}`, refreshToken, 7 * 24 * 60 * 60)

      if (!existRefreshToken) {
        throw new ServiceException(UNAUTHORIZED, __('Not found refresh token'))
      }

      return JWT.generate(userId, '15m')
    } catch (error) {
      throw new ServiceException(error.status || UNAUTHORIZED, error.message)
    }
  }
}

export default AuthService
