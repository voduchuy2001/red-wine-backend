import { swaggerAccount } from '@constants/swagger.account'
import ServiceException from '@exceptions/service.exception'
import Bcrypt from '@utils/bcrypt'

class SwaggerAuthService {
  async login(data) {
    const { username, password } = data

    if (username !== swaggerAccount.username) {
      throw new ServiceException(400, __('User not found'))
    }

    return Bcrypt.compare(password, swaggerAccount.password)
  }
}

export default SwaggerAuthService
