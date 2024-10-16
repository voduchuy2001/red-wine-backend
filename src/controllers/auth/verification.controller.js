import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class VerificationController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async sendResetLinkEmail(req, res, next) {
    const { email } = req.body

    try {
      await this.authService.sendResetLinkEmail(email)
      return this.json(res, OK, __('Password recovery code has been sent to email'))
    } catch (error) {
      next(error)
    }
  }
}

export default VerificationController
