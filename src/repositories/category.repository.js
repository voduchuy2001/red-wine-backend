import db from '@models'
import BaseRepository from '@repositories/base.repository'

export default class CategoryRepository extends BaseRepository {
  constructor() {
    super(db.Category)
  }

  async findByIds(categoryIds) {
    return await this.findAll({ where: { id: categoryIds } })
  }
}
