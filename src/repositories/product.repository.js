import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

class ProductRepository extends BaseRepository {
  constructor() {
    super(db.Product)
  }
}

export default ProductRepository
