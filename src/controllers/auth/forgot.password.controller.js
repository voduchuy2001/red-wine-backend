import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class ForgotPasswordController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async sendResetLinkEmail(req, res, next) {
    const { email } = req.body

    try {
      await this.authService.sendResetLinkEmail(email)
      return this.json(res, OK, __('A fresh reset password link has been sent to your email address.'))
    } catch (error) {
      next(error)
    }
  }

  async resetPassword(req, res, next) {
    const { email, otp, password } = req.body

    try {
      await this.authService.resetPassword(email, otp, password)
      return this.json(res, OK, __('Your password has been updated'))
    } catch (error) {
      next(error)
    }
  }
}

export default ForgotPasswordController
