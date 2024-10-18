import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class AuthController extends BaseController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async auth(req, res, next) {
    const { data: id } = req.auth

    try {
      const authUser = await this.authService.auth(id)
      return this.json(res, OK, __('Success'), authUser)
    } catch (error) {
      next(error)
    }
  }

  async refreshToken(req, res, next) {
    const { refreshToken } = req.body

    try {
      const accessToken = await this.authService.refreshToken(refreshToken)
      return this.json(res, OK, __('Success'), accessToken)
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
