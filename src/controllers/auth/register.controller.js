import { CREATED } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class RegisterController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async register(req, res, next) {
    const data = req.body

    try {
      await this.authService.register(data)
      return this.json(res, CREATED, __('success'))
    } catch (error) {
      next(error)
    }
  }
}

export default RegisterController
