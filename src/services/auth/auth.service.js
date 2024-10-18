import { generateAvatar } from '@utils/avatar'
import Bcrypt from '@utils/bcrypt'
import JWT from '@config/jwt'
import ServiceException from '@exceptions/service.exception'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from '@constants/http.status.code'
import RedisCache from '@config/cache'
import { v4 as uuidv4 } from 'uuid'
import BaseService from '@services/base.service'
import SystemException from '@exceptions/system.exception'
import db from '@models/index'
import NotFoundException from '@exceptions/not.found.exception'
import Otp from '@utils/otp'
import VerificationEmail from '@mail/verification.email'

class AuthService extends BaseService {
  constructor(userRepository) {
    super(userRepository)
  }

  async validateEmail(email) {
    return this.findOne({ email })
  }

  async validatePassword(inputPassword, userPassword) {
    return Bcrypt.compare(inputPassword, userPassword)
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

    const transaction = await db.sequelize.transaction()
    try {
      await this.repository.updateLastLoginAt(userId, transaction)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }

    const accessToken = JWT.generate(userId, '30m')
    const sessionId = 'session-' + uuidv4()
    const refreshToken = JWT.generate({ userId, sessionId }, '7d', 'refreshToken')
    await RedisCache.set(`auth:user:${userId}:${sessionId}`, refreshToken, 7 * 24 * 60 * 60)
    return { accessToken, refreshToken, sessionId }
  }

  async register(data) {
    const { email, password } = data
    const existedUser = await this.validateEmail(email)
    if (existedUser) {
      throw new ServiceException(BAD_REQUEST, __('Email has been already exist'))
    }
    const hashedPassword = await Bcrypt.hash(password)
    const avatar = generateAvatar(email, 200) || null
    const transaction = await db.sequelize.transaction()
    try {
      const user = await this.create({ email, avatar, password: hashedPassword }, transaction)
      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async logout(refreshToken) {
    try {
      const decoded = JWT.verify(refreshToken, 'refreshToken')
      const { userId, sessionId } = decoded.data
      await RedisCache.get(`auth:user:${userId}:${sessionId}`)
      await RedisCache.del(`auth:user:${userId}:${sessionId}`)
      return true
    } catch (error) {
      throw new ServiceException(error.status || UNAUTHORIZED, error.message)
    }
  }

  async auth(id) {
    const authUser = await this.repository.auth(id)
    if (!authUser) {
      throw new ServiceException(NOT_FOUND, __('Not found user'))
    }
    return authUser
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = JWT.verify(refreshToken, 'refreshToken')
      const { userId, sessionId } = decoded.data
      await RedisCache.get(`auth:user:${userId}:${sessionId}`, refreshToken, 7 * 24 * 60 * 60)
      return JWT.generate(userId, '30m')
    } catch (error) {
      throw new ServiceException(error.status || UNAUTHORIZED, error.message)
    }
  }

  async sendVerifyEmail(email) {
    const user = await this.findOne({ email, emailVerifiedAt: null })
    if (!user) {
      throw new NotFoundException(NOT_FOUND, __('Not found user or user has been verified'))
    }

    const otp = Otp.generate(6)
    const key = `verify:user:${email}`
    const EXP_TIME = 5 // 5 minutes

    const data = { to: email, otp, expirationTime: EXP_TIME }
    const verificationEmail = new VerificationEmail(data)
    try {
      await RedisCache.setex(key, otp, EXP_TIME * 60 * 60)
      await verificationEmail.send()
    } catch (error) {
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async verifyEmail(email, otp) {
    const key = `verify:user:${email}`

    const storedOtp = await RedisCache.get(key)
    if (!storedOtp) {
      throw new NotFoundException(NOT_FOUND, __('OTP not found or expired'))
    }

    if (storedOtp !== otp) {
      throw new ServiceException(BAD_REQUEST, __('Invalid OTP'))
    }

    const user = await this.findOne({ email })
    if (!user) {
      throw new NotFoundException(NOT_FOUND, __('Not found user'))
    }

    const transaction = await db.sequelize.transaction()

    try {
      const now = new Date()
      await user.update({ emailVerifiedAt: now }, { transaction })
      await transaction.commit()
      await RedisCache.del(key)
      return user
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default AuthService
