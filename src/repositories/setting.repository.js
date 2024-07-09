import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class SettingRepository extends BaseRepository {
  constructor() {
    super(db.Setting)
  }

  async updateSetting(key, value) {
    const setting = await super.findOne({ where: { key } })
    return await setting.update({ value })
  }
}
