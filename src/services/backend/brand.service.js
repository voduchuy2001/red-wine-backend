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

  async storeImage(image) {
    if (!image) {
      return null
    }

    const outputPath = Storage.publicPath('images/brand')
    return await Storage.storeAs(image.path, outputPath, image.filename)
  }

  async getBrands({ page = 1, pageSize = 10, filterBy = null, q = '', sortBy = 'createdAt', order = 'desc' }) {
    const condition = {
      name: { [Op.like]: `%${q}%` },
      status: filterBy
    }
    const orderOptions = [[sortBy, order]]
    return this.paginate(page, pageSize, condition, null, { order: orderOptions })
  }

  async createBrand(data = {}, image = null) {
    const transaction = await db.sequelize.transaction()
    try {
      const logo = await this.storeImage(image)
      const brand = await this.create({ ...data, logo }, transaction)
      await transaction.commit()
      return brand
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async updateBrand(id, data = {}, image = null) {
    const brand = await this.findOrFail(id)

    if (!brand) {
      throw new NotFoundException(__('Brand not found'))
    }

    const transaction = await db.sequelize.transaction()
    try {
      const logo = await this.storeImage(image)
      await brand.update({ ...data, logo }, { transaction })
      await transaction.commit()
      return brand
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async deleteBrand(id) {
    console.log(id)
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

export default BrandService
