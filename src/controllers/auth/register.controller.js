import { BAD_REQUEST, CREATED } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

export default class RegisterController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async register(req, res, next) {
    const data = req.body

    try {
      const registered = await this.authService.register(data)

      if (!registered) {
        return super.json(res, BAD_REQUEST, __('failure'))
      }

      return super.json(res, CREATED, __('success'))
    } catch (error) {
      next(error)
    }
  }
}
