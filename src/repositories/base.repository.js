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

  /**
   * Asynchronously paginates the results based on the provided parameters.
   *
   * @param {Object} options - The pagination options.
   * @param {number} [options.page=1] - The current page number.
   * @param {number} [options.paginate=25] - The number of items per page.
   * @param {Object} [options.*] - Additional parameters for filtering and sorting.
   *
   * @returns {Object} An object containing paginated results and pagination details:
   * - total: Total number of items.
   * - perPage: Number of items per page.
   * - currentPage: Current page number.
   * - lastPage: Last page number.
   * - nextPageURL: URL for the next page.
   * - prevPageURL: URL for the previous page.
   * - from: Starting index of the items on the current page.
   * - to: Ending index of the items on the current page.
   * - docs: Array of paginated items.
   */
  async paginate({ page = 1, paginate = 25, ...params } = {}) {
    const options = { ...params }
    const countOptions = Object.keys(options).reduce((acc, key) => {
      if (!['order', 'attributes', 'include'].includes(key)) {
        acc[key] = options[key]
      }
      return acc
    }, {})

    let total = await this.model.count(countOptions)

    if (options.group !== undefined) {
      total = total.length
    }

    const pages = Math.ceil(total / paginate)
    options.limit = paginate
    options.offset = paginate * (page - 1)

    if (params.order) options.order = params.order
    const docs = await this.findAll(options)

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
