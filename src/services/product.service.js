import BaseService from '@services/base.service'

export default class ProductService extends BaseService {
  constructor(productRepository) {
    super(productRepository)
  }

  async index(data = {}) {
    const { page, limit, q } = data
    const products = await super.paginate({ page, limit, q })
    return products.length ? products : null
  }

  async show(id) {
    return super.findOne(id)
  }

  async create(data = {}) {}
}
