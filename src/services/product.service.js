import BaseService from '@services/base.service'

export default class ProductService extends BaseService {
  constructor(productRepository) {
    super(productRepository)
  }

  async index(data = {}) {
    const { page, limit, q } = data
    return super.paginate({ page, limit, q })
  }

  async show(id) {
    return super.findOne(id)
  }
}
