import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class ProductCategoryRepository extends BaseRepository {
  constructor() {
    super(db.ProductCategory)
  }
}
