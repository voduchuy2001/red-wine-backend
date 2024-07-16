import BaseService from '@services/base.service'

export default class ProductCategoryService extends BaseService {
  constructor(productCategoryRepository) {
    super(productCategoryRepository)
  }

  async index(queryParams = {}) {
    const categories = await this.repository.paginate(queryParams)

    return categories.docs.length ? categories : null
  }
}
