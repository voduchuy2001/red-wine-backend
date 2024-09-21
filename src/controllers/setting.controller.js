import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class SettingController extends BaseController {
  constructor(settingService) {
    super()
    this.settingService = settingService
  }

  async vnpSetting(req, res, next) {
    const { value } = req.body

    try {
      await this.settingService.vnpSetting(value)

      return super.json(res, OK, __('success'))
    } catch (error) {
      next(error)
    }
  }
}

export default SettingController
