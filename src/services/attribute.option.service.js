import BaseService from '@services/base.service'
import { Op } from 'sequelize'

class AttributeOptionService extends BaseService {
  constructor(attributeRepository) {
    super(attributeRepository)
  }

  async getAttributeOptions({ page = 1, pageSize = 10, filterBy = '', q = '', sortBy = 'createdAt', order = 'desc' }) {
    const condition = {}
    if (q) {
      condition.value = { [Op.like]: `%${q}%` }
    }
    if (filterBy) {
      condition.attributeId = filterBy
    }
    const orderOptions = [[sortBy, order]]
    return this.paginate(page, pageSize, condition, null, { order: orderOptions })
  }
}

export default AttributeOptionService
