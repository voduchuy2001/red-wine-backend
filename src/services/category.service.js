import BaseService from './base.service'

export default class CategoryService extends BaseService {
  constructor(categoryRepository) {
    super(categoryRepository)
  }

  async index(data = {}) {
    const { page, limit, q } = data
    return super.paginate({ page, limit, q })
  }
}
