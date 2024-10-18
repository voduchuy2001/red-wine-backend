import { Op } from 'sequelize'
import BaseService from '../base.service'
import SystemException from '@exceptions/system.exception'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import db from '@models/index'
import NotFoundException from '@exceptions/not.found.exception'
import Storage from '@utils/storage'

class CategoryService extends BaseService {
  constructor(categoryRepository) {
    super(categoryRepository)
  }

  async storeImage(image) {
    if (!image) {
      return null
    }

    const outputPath = Storage.publicPath('images/category')
    return await Storage.storeAs(image.path, outputPath, image.filename)
  }

  async getCategories({ page = 1, pageSize = 10, filterBy = '', q = '', sortBy = 'createdAt', order = 'desc' }) {
    const condition = {}
    if (q) {
      condition.name = { [Op.like]: `%${q}%` }
    }
    if (filterBy) {
      condition.status = filterBy
    }
    const orderOptions = [[sortBy, order]]
    return this.paginate(page, pageSize, condition, null, { order: orderOptions })
  }

  async createCategory(data = {}, image = null) {
    const transaction = await db.sequelize.transaction()
    try {
      const logo = await this.storeImage(image)
      const category = await this.create({ ...data, image: logo }, transaction)
      await transaction.commit()
      return category
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async updateCategory(id, data = {}, image = null) {
    const category = await this.findOrFail(id)

    const transaction = await db.sequelize.transaction()
    try {
      const logo = await this.storeImage(image)
      await category.update({ ...data, image: logo }, { transaction })
      await transaction.commit()
      return category
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async deleteCategory(id) {
    const brand = await this.findOrFail(id)

    const transaction = await db.sequelize.transaction()
    try {
      await brand.destroy({ transaction })
      await transaction.commit()
      return true
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default CategoryService
