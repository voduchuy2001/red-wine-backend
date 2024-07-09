import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export default class SettingController {
  constructor(settingService) {
    this.settingService = settingService
  }

  async vnpaySetting(req, res) {
    const { value } = req.body

    try {
      const vnpaySetting = await this.settingService.vnpaySetting(value)

      if (!vnpaySetting) return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure)

      return HttpHelper.successResponse(res, OK, MESSAGES.success)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
