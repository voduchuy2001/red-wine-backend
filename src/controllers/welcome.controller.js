import BaseController from '@controllers/base.controller'

class WelcomeController extends BaseController {
  constructor() {
    super()
  }

  async index(req, res, next) {
    try {
      const userAgent = req.get('user-agent')
      return this.view(res, 'pages/welcome', { userAgent })
    } catch (error) {
      next(error)
    }
  }
}

export default WelcomeController
