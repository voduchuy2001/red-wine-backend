import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import BaseController from '@controllers/base.controller'

export default class OAuthGoogleController extends BaseController {
  constructor(googleOAuthService) {
    super()
    this.googleOAuthService = googleOAuthService
  }

  async redirect(req, res) {
    try {
      const redirectUrl = await this.googleOAuthService.redirect()

      if (!redirectUrl) {
        return this.json(res, BAD_REQUEST, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success, redirectUrl)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async callback(req, res) {
    const { code } = req.query

    try {
      if (!code) {
        return this.json(res, UNAUTHORIZED, MESSAGES.failure)
      }

      const loggedIn = await this.googleOAuthService.callback(code)

      if (!loggedIn) {
        return this.json(res, UNAUTHORIZED, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success, loggedIn)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
