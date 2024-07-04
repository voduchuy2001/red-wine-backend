import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class UserRepository extends BaseRepository {
  constructor() {
    super(db.User)
  }
}
