class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  async getAll(withRelations = []) {
    return this.repository.all(withRelations)
  }

  async getById(id, withRelations = []) {
    return this.repository.findOrFail(id, withRelations)
  }

  async create(data) {
    return this.repository.create(data)
  }

  async update(id, data) {
    await this.getById(id)
    return this.repository.update({ id }, data)
  }

  async delete(id) {
    await this.getById(id)
    return this.repository.delete({ id })
  }

  async count(condition = {}) {
    return this.repository.count(condition)
  }

  async findOne(condition = {}, withRelations = []) {
    return this.repository.find(condition, withRelations)
  }

  async findByCondition(condition = {}, withRelations = []) {
    return this.repository.findByCondition(condition, withRelations)
  }

  async firstOrCreate(condition, defaults) {
    return this.repository.firstOrCreate(condition, defaults)
  }

  async advancedGet(params = {}) {
    return this.repository.advancedGet(params)
  }
}

export default BaseService
