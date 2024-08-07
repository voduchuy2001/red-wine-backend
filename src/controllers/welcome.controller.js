import BaseController from '@controllers/base.controller'

export default class WelcomeController extends BaseController {
  constructor() {
    super()
  }

  async index(req, res, next) {
    try {
      const userAgent = req.get('user-agent')
      return super.view(res, 'pages/welcome', { userAgent })
    } catch (error) {
      next(error)
    }
  }
}
