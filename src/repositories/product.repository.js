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

  async findOne(id) {
    const options = {
      where: { id },
      include: [
        {
          model: db.Brand,
          as: 'brand',
          attributes: ['id', 'name', 'website', 'description', 'status', 'featured']
        },
        {
          model: db.Category,
          as: 'categories',
          through: { attributes: [] },
          attributes: ['id', 'name', 'status', 'featured']
        },
        {
          model: db.Variant,
          as: 'variants',
          include: [
            {
              model: db.OptionValue,
              as: 'optionValues',
              include: [
                {
                  model: db.ProductOption,
                  as: 'option',
                  attributes: ['id', 'name']
                }
              ],
              attributes: ['id', 'value']
            }
          ],
          attributes: ['id', 'sku', 'price', 'quantity']
        },
        {
          model: db.Media,
          as: 'media',
          attributes: ['id', 'type', 'mimeType', 'size', 'url', 'alt']
        }
      ]
    }

    return super.findOne(options)
  }
}
