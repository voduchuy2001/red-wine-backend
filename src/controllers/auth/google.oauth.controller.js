import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

export default class GoogleOAuthController extends BaseController {
  constructor(googleOAuthService) {
    super()
    this.googleOAuthService = googleOAuthService
  }

  async redirect(req, res) {
    try {
      const redirectUrl = await this.googleOAuthService.redirect()

      if (!redirectUrl) {
        return super.json(res, BAD_REQUEST, __('failure'))
      }

      return super.json(res, OK, __('success'), redirectUrl)
    } catch (error) {
      return super.json(res, INTERNAL_SERVER_ERROR, __('failure'), error.message)
    }
  }

  async callback(req, res) {
    const { code } = req.query

    try {
      if (!code) {
        return super.json(res, UNAUTHORIZED, __('failure'))
      }

      const loggedIn = await this.googleOAuthService.callback(code)

      if (!loggedIn) {
        return super.json(res, UNAUTHORIZED, __('failure'))
      }

      return super.json(res, OK, __('success'), loggedIn)
    } catch (error) {
      return super.json(res, INTERNAL_SERVER_ERROR, __('failure'), error.message)
    }
  }
}
