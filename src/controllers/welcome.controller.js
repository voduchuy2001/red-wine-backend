import { BAD_REQUEST } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export default class WelcomeController {
  static async index(req, res) {
    try {
      const userAgent = req.get('user-agent')
      return res.status(200).render('pages/welcome', { userAgent })
    } catch (error) {
      return HttpHelper.errorResponse(res, BAD_REQUEST, MESSAGES.failure, error.message)
    }
  }
}
