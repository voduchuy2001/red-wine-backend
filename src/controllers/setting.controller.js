import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import BaseController from '@controllers/base.controller'

export default class SettingController extends BaseController {
  constructor(settingService) {
    super()
    this.settingService = settingService
  }

  async vnpSetting(req, res) {
    const { value } = req.body

    try {
      const vnpSetting = await this.settingService.vnpSetting(value)

      if (!vnpSetting) return this.json(res, BAD_REQUEST, MESSAGES.failure)

      return this.json(res, OK, MESSAGES.success)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
