import BaseService from '@services/base.service'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import db from '@models/index'
import SystemException from '@exceptions/system.exception'
import { Op } from 'sequelize'
import NotFoundException from '@exceptions/not.found.exception'
import Storage from '@utils/storage'

class BrandService extends BaseService {
  constructor(brandRepository) {
    super(brandRepository)
  }

  async storeImage(logo) {
    if (!logo) return null

    const outputPath = Storage.publicPath('images/brand')
    return await Storage.storeAs(logo.path, outputPath, logo.filename)
  }

  async getBrands({ page = 1, pageSize = 10, filterBy, q = '', sortBy = 'createdAt', order = 'desc' }) {
    const condition = {
      name: { [Op.like]: `%${q}%` },
      status: filterBy
    }
    const orderOptions = [[sortBy, order]]

    return this.paginate(page, pageSize, condition, null, { order: orderOptions })
  }

  async createBrand(data = {}, logo = null) {
    const transaction = await db.sequelize.transaction()
    try {
      const image = await this.storeImage(logo)
      const brand = await this.create({ ...data, image }, transaction)
      await transaction.commit()
      return brand
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async updateBrand(id, data = {}, logo = null) {
    const brand = await this.findOrFail(id)

    if (!brand) {
      throw new NotFoundException(__('Brand not found'))
    }

    const transaction = await db.sequelize.transaction()
    try {
      const image = await this.storeImage(logo)
      await brand.update({ ...data, image }, { transaction })
      await transaction.commit()
      return brand
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default BrandService
