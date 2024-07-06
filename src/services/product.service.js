import { PRODUCT_STATUS } from '@constants/product.status'
import db from '@models/index'
import BaseService from '@services/base.service'

export default class ProductService extends BaseService {
  constructor(productRepository, productCategoryRepository) {
    super(productRepository)
    this.productCategoryRepository = productCategoryRepository
  }

  async index(queryParams = {}) {
    const { page, paginate, search, categoryIds } = queryParams
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

    const products = await super.paginate(options)

    return products.docs.length ? products : null
  }

  async setProductCategories(productId, categoryIds) {
    const categories = await this.productCategoryRepository.findAll({ where: { id: categoryIds } })
    await this.repository.setCategoriesToProduct(productId, categories)
  }

  async create(productDetails, categoryIds = []) {
    const newProductData = { ...productDetails }
    const assignedCategoryIds = [...categoryIds]

    newProductData.images = JSON.stringify(newProductData.images)
    newProductData.status = PRODUCT_STATUS[newProductData.status]

    const createdProduct = await super.create(newProductData)

    const productId = createdProduct.id
    await this.setProductCategories(productId, assignedCategoryIds)

    return true
  }

  async update(updateDetails) {
    const { id, categoryIds = [], ...productData } = updateDetails

    productData.images = JSON.stringify(productData.images)
    productData.status = PRODUCT_STATUS[productData.status]

    const [updated] = await super.update(id, productData)
    if (!updated) return false

    await this.setProductCategories(id, categoryIds)

    return true
  }
}
