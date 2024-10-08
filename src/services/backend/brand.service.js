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

  async getBrands({ page = 1, pageSize = 10, filterBy, q = '', sortBy = 'createdAt', order = 'desc' }) {
    const condition = { name: { [Op.like]: `%${q}%` }, status: filterBy }
    const orderOptions = [[sortBy, order]]

    return this.paginate(page, pageSize, condition, [{ model: db.Media, as: 'logo' }], { order: orderOptions })
  }

  async createLogo(brand, image, transaction = null) {
    return brand.createLogo({ url: image }, { transaction })
  }

  async createBrand(data, image = null) {
    const transaction = await db.sequelize.transaction()

    try {
      const brand = await this.create(data, transaction)
      if (image) {
        await this.createLogo(brand, image, transaction)
      }

      await transaction.commit()
      return brand
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async updateBrand(id, data, image = null) {
    const brand = await this.findOrFail(id)
    if (!brand) {
      throw new NotFoundException(__('Brand not found'))
    }

    console.log(db.Brand.prototype)

    const transaction = await db.sequelize.transaction()
    try {
      if (image) {
        const oldLogo = await brand.getLogo()
        if (oldLogo) {
          await Storage.unlink(`images/brand/${oldLogo.url}`, 'public')
          await brand.removeLogo(oldLogo, { transaction })
        }

        await this.createLogo(brand, image, transaction)
      }

      await brand.update(data, { transaction })

      await transaction.commit()
      return brand
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default BrandService
