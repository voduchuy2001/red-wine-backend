import { OK, UNAUTHORIZED } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

export default class LoginController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async login(req, res, next) {
    const data = req.body

    try {
      const loggedIn = await this.authService.login(data)

      if (!loggedIn) {
        return super.json(res, UNAUTHORIZED, __('failure'))
      }

      return super.json(res, OK, __('success'), loggedIn)
    } catch (error) {
      next(error)
    }
  }
}
