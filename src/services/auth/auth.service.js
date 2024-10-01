import { generateAvatar } from '@utils/avatar'
import Bcrypt from '@utils/bcrypt'
import JWT from '@config/jwt'
import ServiceException from '@exceptions/service.exception'
import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from '@constants/http.status.code'

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
    const token = JWT.generate(user.id, '3d')

    return { token, user }
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

  async logout(data) {
    const { data: id } = data
    const user = await this.userRepository.findOne({ where: id })
    if (!user) {
      throw new ServiceException(BAD_REQUEST, __('User not found'))
    }

    return true
  }

  async auth(id) {
    const authUser = await this.userRepository.auth(id)
    if (!authUser) {
      throw new ServiceException(NOT_FOUND, __('Not found user'))
    }
    return authUser
  }
}

export default AuthService
