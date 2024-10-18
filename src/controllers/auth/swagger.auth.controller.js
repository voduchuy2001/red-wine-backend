import { OK } from '@constants/http.status.code'
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
      await this.swaggerAuthService.login(data, req)
      return this.json(res, OK, __('Success'))
    } catch (error) {
      next(error)
    }
  }
}

export default SwaggerAuthController
