import { MESSAGES } from '@constants/message'
import { generateAvatar } from '@utils/avatar'
import Bcrypt from '@utils/bcrypt'
import JWT from '@utils/jwt'

export default class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async login(data) {
    const { email, password } = data

    const findUser = await this.userRepository.findOne({ where: { email } })
    if (!findUser) return false

    const matchedPassword = await Bcrypt.comparePassword(password, findUser.password)
    if (!matchedPassword) return false

    findUser.update({ lastLoginAt: new Date() })
    await findUser.save()

    const loggedInUser = findUser.get({ plain: true })
    delete loggedInUser.password

    loggedInUser.token = JWT.generate(findUser.id, '7d')

    return loggedInUser
  }

  async register(data) {
    const { email, password } = data

    const existedUser = await this.userRepository.findOne({ where: { email } })
    if (existedUser) throw new Error(MESSAGES.isExisted)

    const hashedPassword = await Bcrypt.hashPassword(password)
    const avatar = generateAvatar(email, 200) || null
    const user = await this.userRepository.create({ email, avatar, password: hashedPassword })

    const registeredUser = user.get({ plain: true })
    delete registeredUser.password

    return registeredUser
  }
}
