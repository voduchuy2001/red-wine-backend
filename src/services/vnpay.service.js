import { SETTING_KEY } from '@constants/setting.key'

export default class VNPayService {
  constructor(settingRepository) {
    this.settingRepository = settingRepository
  }

  async getVnpaySetting() {
    const setting = await this.settingRepository.getSetting(SETTING_KEY.VNPAY)
    const { enabled, ...data } = JSON.parse(setting.value)
    return enabled ? data : false
  }
}
