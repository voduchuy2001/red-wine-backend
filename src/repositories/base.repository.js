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

  async paginate({ page = 1, limit = 25, ...params } = {}) {
    page = Number.isInteger(parseInt(page, 10)) ? parseInt(page, 10) : 1
    limit = Number.isInteger(parseInt(limit, 10)) ? parseInt(limit, 10) : 25
    const offset = limit * (page - 1)
    return this.findAll({ ...params, limit, offset })
  }
}
