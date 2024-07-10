import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export default class SwaggerAuthController {
  constructor(swaggerAuthService) {
    this.swaggerAuthService = swaggerAuthService
  }

  async showLoginForm(req, res) {
    try {
      return res.status(200).render('pages/login')
    } catch (error) {
      HttpHelper.errorResponse(res, 500, INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async login(req, res) {
    const data = req.body

    try {
      const loggedIn = await this.swaggerAuthService.login(data)

      if (!loggedIn) {
        return HttpHelper.successResponse(res, UNAUTHORIZED, MESSAGES.failure)
      }

      req.session.authenticated = true

      HttpHelper.successResponse(res, OK, MESSAGES.success, loggedIn)
    } catch (error) {
      HttpHelper.errorResponse(res, 500, INTERNAL_SERVER_ERROR, error.message)
    }
  }
}
