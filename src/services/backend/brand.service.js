import BaseService from '@services/base.service'
import ServiceException from '@exceptions/service.exception'
import { BAD_REQUEST } from '@constants/http.status.code'

class BrandService extends BaseService {
  constructor(brandRepository) {
    super(brandRepository)
  }

  async getBrands({ page = 1, perPage = 10, filter = {}, sort = [], select = [] }) {
    const condition = {}
    if (filter && typeof filter === 'object') {
      Object.keys(filter).forEach((key) => {
        if (['name', 'website', 'description', 'status', 'featured', 'order'].includes(key)) {
          condition[key] = filter[key]
        }
      })
    }

    const orderBy = []
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach(({ field, direction }) => {
        if (['name', 'status', 'order'].includes(field) && ['ASC', 'DESC'].includes(direction.toUpperCase())) {
          orderBy.push([field, direction.toUpperCase()])
        }
      })
    }

    const paginate = { perPage, currentPage: page }

    const { rows, count } = await super.advancedGet({
      condition,
      orderBy,
      paginate,
      select
    })

    if (!rows) {
      throw new ServiceException(BAD_REQUEST, __('Can not get data'))
    }

    return {
      rows,
      count,
      currentPage: page,
      perPage,
      totalPages: Math.ceil(count / perPage)
    }
  }

  async createLogo(brand, image) {
    const logo = await brand.createLogo({ url: image })
    if (!logo) {
      throw new ServiceException(BAD_REQUEST, __('Failed to create logo'))
    }
    return logo
  }

  async createBrand(data, image) {
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
