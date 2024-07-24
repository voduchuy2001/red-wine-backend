import { SETTING_KEY } from '@constants/setting.key'
import BaseService from '@services/base.service'

export default class SettingService extends BaseService {
  constructor(settingRepository) {
    super(settingRepository)
  }

  async vnpSetting(value = {}) {
    const parseJson = JSON.stringify(value)
    return !!(await this.repository.updateSetting(SETTING_KEY.VNPAY, parseJson))
  }
}
