class BaseRepository {
  constructor(model) {
    this.model = model
  }

  async findAll(options = {}) {
    return this.model.findAll(options)
  }

  async findOne(options = {}) {
    return this.model.findOne(options)
  }

  async findById(id) {
    return this.model.findByPk(id)
  }

  async create(data, transaction = null) {
    return this.model.create(data, { transaction })
  }

  async update(id, data, transaction = null) {
    return this.model.update(data, { where: { id }, transaction })
  }

  async remove(id, transaction = null) {
    return this.model.destroy({ where: { id }, transaction })
  }

  async paginate({ limit = 10, offset = 0, ...params } = {}) {
    return this.findAll({ limit, offset, ...params })
  }
}

export default BaseRepository
