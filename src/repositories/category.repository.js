import db from '@models'
import BaseRepository from '@repositories/base.repository'

class CategoryRepository extends BaseRepository {
  constructor() {
    super(db.Category)
  }
}

export default CategoryRepository
