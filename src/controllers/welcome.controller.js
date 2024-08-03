import { BAD_REQUEST } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

export default class WelcomeController extends BaseController {
  constructor() {
    super()
  }

  async index(req, res) {
    try {
      const userAgent = req.get('user-agent')
      return super.view(res, 'pages/welcome', { userAgent })
    } catch (error) {
      return super.json(res, BAD_REQUEST, __('failure'), error.message)
    }
  }
}
