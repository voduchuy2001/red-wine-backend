import BaseService from '@services/base.service'

export default class BrandService extends BaseService {
  constructor(brandRepository, mediaRepository) {
    super(brandRepository)
    this.mediaRepository = mediaRepository
  }

  async index(data = {}) {
    const { page, limit, q } = data
    return super.paginate({ page, limit, q })
  }

  sanitize(value) {
    return value === '' ? null : value
  }

  async addMediaToBrand(url, mediableId, alt) {
    return this.mediaRepository.create({ url, mediableType: 'Brand', mediableId, alt })
  }

  async create(data) {
    const { name, website, status, featured, order, logo } = data
    const sanitizedData = {
      name: this.sanitize(name),
      website: this.sanitize(website),
      status: this.sanitize(status),
      featured: this.sanitize(featured),
      order: this.sanitize(order),
      logo: this.sanitize(logo)
    }

    const brand = await super.create(sanitizedData)

    if (logo) {
      await this.addMediaToBrand(logo, brand.id, brand.name)
    }

    return true
  }
}
