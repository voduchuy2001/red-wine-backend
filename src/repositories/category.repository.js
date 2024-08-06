import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class CategoryRepository extends BaseRepository {
  constructor() {
    super(db.Category)
  }
}
