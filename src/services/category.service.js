import BaseService from '@services/base.service'
import db from '@models/index'

export default class CategoryService extends BaseService {
  constructor(categoryRepository) {
    super(categoryRepository)
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
