import db from '@models/index'
import BaseService from './base.service'

export default class CategoryService extends BaseService {
  constructor(categoryRepository, mediaRepository) {
    super(categoryRepository)
    this.mediaRepository = mediaRepository
  }

  async index(data = {}) {
    const { page, limit, q } = data
    return super.paginate({ page, limit, q })
  }

  async create(data = {}) {
    const { name, parentId, status, featured, order, image } = data

    const category = await super.create(categoryData)
    console.log(db.Category.prototype)
  }
}
