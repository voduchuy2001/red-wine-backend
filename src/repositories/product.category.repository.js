import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class ProductCategoryRepository extends BaseRepository {
  constructor() {
    super(db.ProductCategory)
  }

  async paginate({ page, paginate, search }) {
    const whereClause = search ? { name: { [db.Sequelize.Op.like]: `%${search}%` } } : {}
    const options = {
      where: { ...whereClause },
      page,
      paginate
    }

    return super.paginate(options)
  }
}
