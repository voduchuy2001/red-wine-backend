export default class BaseRepository {
  constructor(model) {
    this.model = model
  }

  async findAll(options = null) {
    return await this.model.findAll(options)
  }

  async findOne(options = null) {
    return await this.model.findOne(options)
  }

  async findById(id) {
    return await this.model.findByPk(id)
  }

  async create(data) {
    return await this.model.create(data)
  }

  async update(id, data) {
    return await this.model.update(data, { where: { id } })
  }

  async remove(id) {
    return await this.model.destroy({ where: { id } })
  }

  async paginate(options = null) {
    return await this.model.paginate(options)
  }
}
