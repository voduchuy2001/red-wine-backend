import { swaggerAccount } from '@constants/swagger.account'
import Bcrypt from '@utils/bcrypt'

export default class SwaggerAuthService {
  async login(data) {
    const { username, password } = data
    if (username !== swaggerAccount.username) return false

    return await Bcrypt.comparePassword(password, swaggerAccount.password)
  }
}
