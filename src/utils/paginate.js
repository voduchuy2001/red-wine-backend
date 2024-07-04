'use strict'

export class SequelizePaginate {
  paginate(Model) {
    const pagination = async function ({ page = 1, paginate = 25, ...params } = {}) {
      const options = { ...params }
      const countOptions = Object.keys(options).reduce((acc, key) => {
        if (!['order', 'attributes', 'include'].includes(key)) {
          acc[key] = options[key]
        }
        return acc
      }, {})

      let total = await this.count(countOptions)

      if (options.group !== undefined) {
        total = total.length
      }

      const pages = Math.ceil(total / parseInt(paginate))
      options.limit = parseInt(paginate)
      options.offset = parseInt(paginate) * (parseInt(page) - 1)
      if (params.limit) {
        console.warn(`(sequelize-pagination) Warning: limit option is ignored.`)
      }
      if (params.offset) {
        console.warn(`(sequelize-pagination) Warning: offset option is ignored.`)
      }
      if (params.order) options.order = params.order
      const docs = await this.findAll(options)

      const currentPage = parseInt(page)
      const perPage = parseInt(paginate)
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

    const instanceOrModel = Model.Instance || Model
    instanceOrModel.paginate = pagination
  }
}

export default new SequelizePaginate()
