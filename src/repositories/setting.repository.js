import db from '@models'
import BaseRepository from '@repositories/base.repository'

class SettingRepository extends BaseRepository {
  constructor() {
    super(db.Setting)
  }

  async getSetting(key = '') {
    return await super.findOne({ where: { key } })
  }

  async updateSetting(key, value) {
    const setting = await this.getSetting(key)
    return await setting.update({ value })
  }
}

export default SettingRepository
