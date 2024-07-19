import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

export default class SwaggerAuthController extends BaseController {
  constructor(swaggerAuthService) {
    super()
    this.swaggerAuthService = swaggerAuthService
  }

  async showLoginForm(req, res) {
    try {
      return this.view(res, 'pages/login')
    } catch (error) {
      return this.json(res, 500, INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async login(req, res) {
    const data = req.body

    try {
      const loggedIn = await this.swaggerAuthService.login(data)

      if (!loggedIn) {
        return this.json(res, UNAUTHORIZED, __('swagger.login.failed'))
      }

      req.session.authenticated = true

      return this.json(res, OK, __('swagger.login.success'), loggedIn)
    } catch (error) {
      return this.json(res, 500, INTERNAL_SERVER_ERROR, error.message)
    }
  }
}
