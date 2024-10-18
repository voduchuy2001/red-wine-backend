import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import SystemException from '@exceptions/system.exception'
import db from '@models/index'
import BaseService from '@services/base.service'
import { Op } from 'sequelize'

class TaxService extends BaseService {
  constructor(taxRepository) {
    super(taxRepository)
  }

  async getTaxes({ page = 1, pageSize = 10, filterBy = '', q = '', sortBy = 'createdAt', order = 'desc' }) {
    const condition = {}
    if (q) {
      condition.title = { [Op.like]: `%${q}%` }
    }
    if (filterBy) {
      condition.status = filterBy
    }
    const orderOptions = [[sortBy, order]]
    return this.paginate(page, pageSize, condition, null, { order: orderOptions })
  }

  async createTax(data) {
    const transaction = await db.sequelize.transaction()
    try {
      const tax = await this.create(data, transaction)
      await transaction.commit()
      return tax
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async updateTax(id, data) {
    const tax = await this.findOrFail(id)

    const transaction = await db.sequelize.transaction()
    try {
      await tax.update(data, { transaction })
      await transaction.commit()
      return tax
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async deleteTax(id) {
    const tax = await this.findOrFail(id)

    const transaction = await db.sequelize.transaction()
    try {
      await tax.destroy({ transaction })
      await transaction.commit()
      return true
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default TaxService
