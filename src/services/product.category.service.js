import BaseService from '@services/base.service'

export default class ProductCategoryService extends BaseService {
  constructor(productCategoryRepository) {
    super(productCategoryRepository)
  }

  async index({ page, limit, search, categoryIds }) {
    const options = { page: Number(page), paginate: Number(limit), search, categoryIds }
    const categories = await this.repository.paginate(options)

    return categories.docs.length ? categories : null
  }
}
