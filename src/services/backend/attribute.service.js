import BaseService from '@services/base.service'
import { Op } from 'sequelize'
import db from '@models/index'
import SystemException from '@exceptions/system.exception'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'

class AttributeService extends BaseService {
  constructor(attributeRepository) {
    super(attributeRepository)
  }

  async getAttributes({ page = 1, pageSize = 10, filterBy = '', q = '', sortBy = 'createdAt', order = 'desc' }) {
    const condition = {}
    if (q) {
      condition.name = { [Op.like]: `%${q}%` }
    }
    if (filterBy) {
      condition.isVisible = filterBy
    }
    const orderOptions = [[sortBy, order]]
    return this.paginate(page, pageSize, condition, null, { order: orderOptions })
  }

  async createAttribute(data) {
    const transaction = await db.sequelize.transaction()
    try {
      const attribute = await this.create(data, transaction)
      await transaction.commit()
      return attribute
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async updateAttribute(id, data) {
    const attribute = await this.findOrFail(id)

    const transaction = await db.sequelize.transaction()
    try {
      await attribute.update(data, { transaction })
      await transaction.commit()
      return attribute
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async deleteAttribute(id) {
    const attribute = await this.findOrFail(id)

    const transaction = await db.sequelize.transaction()
    try {
      await attribute.destroy({ transaction })
      await transaction.commit()
      return true
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default AttributeService
