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

  async paginate({ limit = 10, offset = 0, ...params } = {}) {
    return this.findAll({ limit, offset, ...params })
  }
}
