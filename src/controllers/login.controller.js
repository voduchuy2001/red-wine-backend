import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class LoginController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async login(req, res, next) {
    const data = req.body

    try {
      const loggedIn = await this.authService.login(data)
      return this.json(res, OK, __('Login success'), loggedIn)
    } catch (error) {
      next(error)
    }
  }
}

export default LoginController
