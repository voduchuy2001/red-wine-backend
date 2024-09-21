class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  async findAll(options = null) {
    return this.repository.findAll(options)
  }

  async findOne(options = null) {
    return this.repository.findOne(options)
  }

  async findById(id) {
    return this.repository.findById(id)
  }

  async create(data) {
    return this.repository.create(data)
  }

  async update(id, data) {
    return this.repository.update(id, data)
  }

  async remove(id) {
    return this.repository.remove(id)
  }

  async paginate(options = null) {
    return this.repository.paginate(options)
  }
}

export default BaseService
