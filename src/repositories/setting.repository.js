import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class SettingRepository extends BaseRepository {
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
