import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

class ProductRepository extends BaseRepository {
  constructor() {
    super(db.Product)
    this.category = db.Category
    this.brand = db.Brand
    this.productVariant = db.ProductVariant
    this.optionValue = db.OptionValue
    this.media = db.Media
  }

  async paginate(data) {
    const { page, limit, q } = data
    const queryOptions = {
      where: {},
      attributes: ['id', 'name', 'status', 'description', 'sku', 'quantity', 'order', 'price', 'salePrice'],
      include: [
        {
          model: this.brand,
          as: 'brand',
          attributes: ['id', 'name', 'website', 'description', 'status', 'featured', 'order']
        },
        {
          model: this.category,
          as: 'categories',
          through: { attributes: [] },
          attributes: ['id', 'name', 'status', 'featured', 'order']
        },
        { model: this.media, as: 'media', attributes: ['id', 'url', 'alt'] }
      ]
    }

    if (String(q)) {
      queryOptions.where.name = { [db.Sequelize.Op.like]: `%${q}%` }
    }

    return super.paginate({ page, limit, ...queryOptions })
  }

  async findOne(id) {
    const options = {
      where: { id },
      include: [
        { model: this.brand, as: 'brand' },
        { model: this.category, as: 'categories', through: { attributes: [] } },
        {
          model: this.productVariant,
          as: 'variants',
          include: [{ model: this.optionValue, as: 'options', through: { attributes: [] } }]
        },
        { model: this.media, as: 'media' }
      ]
    }

    return super.findOne(options)
  }
}

export default ProductRepository
