import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import BaseController from '@controllers/base.controller'

export default class RegisterController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async register(req, res) {
    const data = req.body

    try {
      const registered = await this.authService.register(data)

      if (!registered) {
        return super.json(res, BAD_REQUEST, MESSAGES.failure)
      }

      return super.json(res, CREATED, MESSAGES.success)
    } catch (error) {
      return super.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
