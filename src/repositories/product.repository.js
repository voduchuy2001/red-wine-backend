import db from '@models/index'
import BaseRepository from '@repositories/base.repository'
import { Op } from 'sequelize'

export default class ProductRepository extends BaseRepository {
  constructor() {
    super(db.Product)
  }

  async paginate(data) {
    const { page, limit, q } = data
    const queryOptions = {
      where: {},
      include: [
        {
          model: db.Media,
          as: 'media',
          attributes: ['alt', 'url']
        }
      ]
    }

    if (q) {
      queryOptions.where.name = { [Op.like]: `%${q}%` }
    }

    return super.paginate({ page, limit, ...queryOptions })
  }
}
