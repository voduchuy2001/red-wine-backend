import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class ProductRepository extends BaseRepository {
  constructor() {
    super(db.Product)
  }

  async setCategoriesToProduct(id, categories) {
    const product = await this.findById(id)
    return product.setCategories(categories)
  }
}
