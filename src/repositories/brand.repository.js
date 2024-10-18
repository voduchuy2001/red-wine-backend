import db from '@models'
import BaseRepository from '@repositories/base.repository'

class BrandRepository extends BaseRepository {
  constructor() {
    super(db.Brand)
  }
}

export default BrandRepository
