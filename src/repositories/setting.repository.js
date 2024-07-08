import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class SettingRepository extends BaseRepository {
  constructor() {
    super(db.Setting)
  }
}
