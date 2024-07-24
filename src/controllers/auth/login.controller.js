import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import BaseController from '@controllers/base.controller'

export default class LoginController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async login(req, res) {
    const data = req.body

    try {
      const loggedIn = await this.authService.login(data)

      if (!loggedIn) {
        return super.json(res, UNAUTHORIZED, MESSAGES.failure)
      }

      return super.json(res, OK, MESSAGES.success, loggedIn)
    } catch (error) {
      return super.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
