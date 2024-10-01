const { Op } = require('sequelize')
const RepositoryException = require('@exceptions/repository.exception')
const { NOT_FOUND } = require('@constants/http.status.code')

class BaseRepository {
  constructor(model) {
    this.model = model
  }

  async all(withRelations = []) {
    return this.model.findAll({ include: withRelations })
  }

  async findById(id, withRelations = []) {
    return this.model.findByPk(id, {
      include: withRelations
    })
  }

  async find(condition = {}, withRelations = []) {
    return this.model.findOne({ where: condition, include: withRelations })
  }

  async findByCondition(condition = {}, withRelations = []) {
    return await this.model.findAll({
      where: condition,
      include: withRelations
    })
  }

  async create(data) {
    return this.model.create(data)
  }

  async update(condition, data) {
    return this.model.update(data, {
      where: condition
    })
  }

  async delete(condition = {}) {
    return this.model.destroy({
      where: condition
    })
  }

  async count(condition = {}) {
    return this.model.count({ where: condition })
  }

  async firstOrCreate(condition, defaults) {
    const [record, created] = await this.model.findOrCreate({
      where: condition,
      defaults: defaults
    })
    return { record, created }
  }

  async firstOrNew(condition) {
    const record = await this.model.findOne({
      where: condition
    })
    if (!record) {
      return this.model.build(condition)
    }
    return record
  }

  applyConditions(query, conditions = {}) {
    Object.keys(conditions).forEach((field) => {
      const value = conditions[field]
      if (Array.isArray(value)) {
        const [condition, val] = value
        query.where[field] = { [Op[condition]]: val }
      } else {
        query.where[field] = value
      }
    })
    return query
  }

  async getByWhereIn(column, values = [], additionalCondition = {}) {
    return this.model.findAll({
      where: {
        [column]: { [Op.in]: values },
        ...additionalCondition
      }
    })
  }

  async findOrFail(id, withRelations = []) {
    const record = await this.model.findByPk(id, {
      include: withRelations
    })
    if (!record) {
      throw new RepositoryException(NOT_FOUND, __(`Record not found with ID ${id}`))
    }
    return record
  }

  async advancedGet({ condition, order_by, paginate, select, take, with: withRelations } = {}) {
    const query = {
      where: condition || {},
      order: order_by || [],
      limit: take || null,
      include: withRelations || [],
      attributes: select || ['*']
    }

    if (paginate) {
      const { per_page, current_paged } = paginate
      return await this.model.findAndCountAll({
        ...query,
        offset: (current_paged - 1) * per_page,
        limit: per_page
      })
    }

    return await this.model.findAll(query)
  }

  async forceDelete(condition) {
    const record = await this.model.findOne({
      where: condition,
      paranoid: false
    })
    if (record) {
      return await record.destroy({ force: true })
    }
    return false
  }

  async restore(condition) {
    const record = await this.model.findOne({
      where: condition,
      paranoid: false
    })
    if (record) {
      return await record.restore()
    }
    return false
  }
}

export default BaseRepository
