import db from '@models/index'
import BaseRepository from './base.repository'

export default class BrandRepository extends BaseRepository {
  constructor() {
    super(db.Brand)
  }

  async paginate(data = {}) {
    const { page, limit, q } = data
    const queryOptions = {
      page,
      limit,
      order: [['createdAt', 'DESC']],
      where: {}
    }

    if (String(q)) {
      queryOptions.where.name = { [db.Sequelize.Op.like]: `%${q}%` }
    }

    return super.paginate(queryOptions)
  }
}
