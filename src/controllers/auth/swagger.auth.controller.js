import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

export default class SwaggerAuthController extends BaseController {
  constructor(swaggerAuthService) {
    super()
    this.swaggerAuthService = swaggerAuthService
  }

  async showLoginForm(req, res) {
    try {
      return super.view(res, 'pages/login')
    } catch (error) {
      return super.json(res, 500, INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async login(req, res) {
    const data = req.body

    try {
      const loggedIn = await this.swaggerAuthService.login(data)

      if (!loggedIn) {
        return super.json(res, UNAUTHORIZED, __('swagger.login.failed'))
      }

      req.session.authenticated = true

      return super.json(res, OK, __('swagger.login.success'), loggedIn)
    } catch (error) {
      return super.json(res, 500, INTERNAL_SERVER_ERROR, error.message)
    }
  }
}
