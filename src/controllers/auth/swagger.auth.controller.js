import { OK, UNAUTHORIZED } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class SwaggerAuthController extends BaseController {
  constructor(swaggerAuthService) {
    super()
    this.swaggerAuthService = swaggerAuthService
  }

  async showLoginForm(req, res, next) {
    try {
      return this.view(res, 'pages/login')
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    const data = req.body

    try {
      const loggedIn = await this.swaggerAuthService.login(data)

      if (!loggedIn) {
        return this.json(res, UNAUTHORIZED, __('failure'))
      }

      req.session.authenticated = true

      return this.json(res, OK, __('success'), loggedIn)
    } catch (error) {
      next(error)
    }
  }
}

export default SwaggerAuthController
