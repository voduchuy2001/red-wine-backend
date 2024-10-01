import BaseService from '@services/base.service'
import ServiceException from '@exceptions/service.exception'
import { BAD_REQUEST } from '@constants/http.status.code'

class BrandService extends BaseService {
  constructor(brandRepository) {
    super(brandRepository)
  }

  async createLogo(brand, image) {
    const logo = await brand.createLogo({ url: image })
    if (!logo) {
      throw new ServiceException(BAD_REQUEST, __('Failed to create logo'))
    }
    return logo
  }

  async create(data, image) {
    const brand = await super.create(data)

    if (!brand) {
      throw new ServiceException(BAD_REQUEST, __('Can not create brand'))
    }

    if (image) {
      await this.createLogo(brand, image)
    }

    return true
  }
}

export default BrandService
