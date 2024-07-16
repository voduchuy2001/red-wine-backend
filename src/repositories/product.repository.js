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

  async paginate({ page, paginate, search, categoryIds }) {
    const whereClause = search ? { name: { [db.Sequelize.Op.like]: `%${search}%` } } : {}
    const includeCategories = categoryIds?.length
      ? [
          {
            model: db.ProductCategory,
            as: 'categories',
            where: { id: categoryIds },
            required: true,
            through: { attributes: [] }
          }
        ]
      : []
    const options = {
      where: { ...whereClause },
      page,
      paginate,
      include: includeCategories
    }

    return super.paginate(options)
  }
}
