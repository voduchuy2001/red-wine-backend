import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class AuthenticateController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async authenticate(req, res, next) {
    const { data: id } = req.auth

    try {
      const authenticatedUser = await this.authService.authenticated(id)
      return super.json(res, OK, __('Success'), authenticatedUser)
    } catch (error) {
      next(error)
    }
  }
}

export default AuthenticateController
