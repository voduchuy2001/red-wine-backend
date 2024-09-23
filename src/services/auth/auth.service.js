import { generateAvatar } from '@utils/avatar'
import Bcrypt from '@utils/bcrypt'
import JWT from '@config/jwt'
import ServiceException from '@exceptions/service.exception'
import UserDto from '@dtos/user.dto'
import { BAD_REQUEST, UNAUTHORIZED } from '@constants/http.status.code'

class AuthService {
  constructor(userRepository, authEvent) {
    this.userRepository = userRepository
    this.authEvent = authEvent
  }

  async validateEmail(email) {
    return this.userRepository.findByEmail(email)
  }

  createUserDto(user) {
    const userDto = new UserDto(user)
    userDto.token = JWT.generate(user.id, '3d')
    return userDto
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
    this.authEvent.emitUserAction('userLoggedIn', user)

    return this.createUserDto(user)
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

    this.authEvent.emitUserAction('userLoggedOut', user)

    return true
  }
}

export default AuthService
