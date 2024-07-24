export default class BaseRepository {
  constructor(model) {
    this.model = model
  }

  async findAll(options = null) {
    return this.model.findAll(options)
  }

  async findOne(options = null) {
    return this.model.findOne(options)
  }

  async findById(id) {
    return this.model.findByPk(id)
  }

  async create(data) {
    return this.model.create(data)
  }

  async update(id, data) {
    return this.model.update(data, { where: { id } })
  }

  async remove(id) {
    return this.model.destroy({ where: { id } })
  }

  async paginate({ page = 1, paginate = 25, ...params } = {}) {
    const options = { ...params }
    const countOptions = { ...options }

    if (params.group) {
      countOptions.distinct = true
      countOptions.col = params.group
    }

    const { count, rows: docs } = await this.model.findAndCountAll({
      ...options,
      limit: paginate,
      offset: paginate * (page - 1)
    })

    const total = Array.isArray(count) ? count.length : count
    const pages = Math.ceil(total / paginate)
    const currentPage = page
    const perPage = paginate
    const lastPage = pages
    const nextPageURL = currentPage < lastPage ? `?page=${currentPage + 1}` : null
    const prevPageURL = currentPage > 1 ? `?page=${currentPage - 1}` : null
    const from = (currentPage - 1) * perPage + 1
    const to = Math.min(total, currentPage * perPage)

    return {
      total,
      perPage,
      currentPage,
      lastPage,
      nextPageURL,
      prevPageURL,
      from,
      to,
      docs
    }
  }
}
