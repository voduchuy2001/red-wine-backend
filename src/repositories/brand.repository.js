import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

class BrandRepository extends BaseRepository {
  constructor() {
    super(db.Brand)
  }
}

export default BrandRepository
