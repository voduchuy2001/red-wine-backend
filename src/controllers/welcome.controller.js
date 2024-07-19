import { BAD_REQUEST } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import BaseController from '@controllers/base.controller'

export default class WelcomeController extends BaseController {
  constructor() {
    super()
  }

  async index(req, res) {
    try {
      const userAgent = req.get('user-agent')
      return this.view(res, 'pages/welcome', { userAgent })
    } catch (error) {
      return this.json(res, BAD_REQUEST, MESSAGES.failure, error.message)
    }
  }
}
