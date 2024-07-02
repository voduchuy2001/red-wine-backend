export default class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  async findAll(options = null) {
    return await this.repository.findAll(options)
  }

  async findOne(options = null) {
    return await this.repository.findOne(options)
  }

  async findById(id) {
    return await this.repository.findById(id)
  }

  async create(data) {
    return await this.repository.create(data)
  }

  async update(id, data) {
    return await this.repository.update(id, data)
  }

  async remove(id) {
    return await this.repository.remove(id)
  }

  async paginate(options = null) {
    return await this.repository.paginate(options)
  }
}
