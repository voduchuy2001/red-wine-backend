import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class ProductOptionRepository extends BaseRepository {
  constructor() {
    super(db.ProductOption)
  }
}
