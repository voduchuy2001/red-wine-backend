import { BAD_REQUEST, OK, UNAUTHORIZED } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class GoogleOAuthController extends BaseController {
  constructor(googleOAuthService) {
    super()
    this.googleOAuthService = googleOAuthService
  }

  async redirect(req, res, next) {
    try {
      const redirectUrl = await this.googleOAuthService.redirect()

      if (!redirectUrl) {
        return this.json(res, BAD_REQUEST, __('failure'))
      }

      return this.json(res, OK, __('success'), redirectUrl)
    } catch (error) {
      next(error)
    }
  }

  async callback(req, res, next) {
    const { code } = req.query

    try {
      if (!code) {
        return this.json(res, UNAUTHORIZED, __('failure'))
      }

      const loggedIn = await this.googleOAuthService.callback(code)

      if (!loggedIn) {
        return this.json(res, UNAUTHORIZED, __('failure'))
      }

      return this.json(res, OK, __('success'), loggedIn)
    } catch (error) {
      next(error)
    }
  }
}

export default GoogleOAuthController
