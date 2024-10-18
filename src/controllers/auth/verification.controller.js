import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class VerificationController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async sendVerifyEmail(req, res, next) {
    const { email } = req.body

    try {
      await this.authService.sendVerifyEmail(email)
      return this.json(res, OK, __('A fresh verification OTP has been sent to your email address.'))
    } catch (error) {
      next(error)
    }
  }

  async verifyEmail(req, res, next) {
    const { email, otp } = req.body

    try {
      await this.authService.verifyEmail(email, otp)
      return this.json(res, OK, __('Your email has been verified'))
    } catch (error) {
      next(error)
    }
  }
}

export default VerificationController
