import BaseService from '@services/base.service'
import db from '@models/index'

export default class ProductCategoryService extends BaseService {
  constructor(productCategoryRepository) {
    super(productCategoryRepository)
  }

  async index(queryParams = {}) {
    const { page, paginate, search } = queryParams
    const whereClause = search ? { name: { [db.Sequelize.Op.like]: `%${search}%` } } : {}
    const options = {
      where: { ...whereClause },
      page,
      paginate
    }

    const categories = await super.paginate(options)

    return categories.docs.length ? categories : null
  }
}
