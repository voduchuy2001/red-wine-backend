import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '@constants/http.status.code'
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
        return super.json(res, UNAUTHORIZED, __('failure'))
      }

      return super.json(res, OK, __('success'), loggedIn)
    } catch (error) {
      return super.json(res, INTERNAL_SERVER_ERROR, __('failure'), error.message)
    }
  }
}
