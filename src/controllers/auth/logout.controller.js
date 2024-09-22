import BaseController from '@controllers/base.controller'
import { OK } from '@constants/http.status.code'

class LogoutController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async logout(req, res, next) {
    const data = req.auth

    try {
      await this.authService.logout(data)
      return super.json(res, OK, __('success'))
    } catch (error) {
      next(error)
    }
  }
}

export default LogoutController
