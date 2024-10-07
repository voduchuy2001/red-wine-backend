const { Op } = require('sequelize')
const RepositoryException = require('@exceptions/repository.exception')
const { NOT_FOUND } = require('@constants/http.status.code')

class BaseRepository {
  constructor(model) {
    this.model = model
  }

  /**
   * Retrieves all records from the database with optional relations.
   *
   * @param {Array} withRelations - The optional relations to include in the query.
   * @returns {Promise} A promise that resolves with the retrieved records.
   * @throws {RepositoryException} If an error occurs while fetching the records.
   */
  async all(withRelations = []) {
    try {
      return this.model.findAll({ include: withRelations })
    } catch (error) {
      throw new RepositoryException('Error fetching all records', error)
    }
  }

  /**
   * Finds a record by its ID with optional relations.
   *
   * @param {number} id - The ID of the record to find.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @returns {Promise} A promise that resolves with the found record.
   * @throws {RepositoryException} If the record with the given ID is not found.
   */
  async findById(id, withRelations = []) {
    const record = await this.model.findByPk(id, { include: withRelations })
    if (!record) {
      throw new RepositoryException(NOT_FOUND, `Record not found with ID ${id}`)
    }
    return record
  }

  /**
   * Finds a single record based on the provided condition with optional relations.
   *
   * @param {Object} condition - The condition to match the record.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @returns {Promise} A promise that resolves with the found record.
   * @throws {RepositoryException} If an error occurs while fetching the record.
   */
  async find(condition = {}, withRelations = []) {
    try {
      return this.model.findOne({ where: condition, include: withRelations })
    } catch (error) {
      throw new RepositoryException('Error fetching record', error)
    }
  }

  /**
   * Finds records based on the provided conditions with optional relations.
   *
   * @param {Object} condition - The conditions to match the records.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @returns {Promise} A promise that resolves with the found records.
   * @throws {RepositoryException} If an error occurs while fetching the records.
   */
  async findByConditions(condition = {}, withRelations = []) {
    try {
      return this.model.findAll({ where: condition, include: withRelations })
    } catch (error) {
      throw new RepositoryException('Error fetching records by condition', error)
    }
  }

  /**
   * Creates a new record in the database.
   *
   * @param {Object} data - The data for the new record.
   * @param {Object} transaction - The transaction to associate with the creation (optional).
   * @returns {Promise} A promise that resolves with the created record.
   */
  async create(data, transaction = null) {
    return this.model.create(data, { transaction })
  }

  /**
   * Updates records in the database based on the provided condition.
   *
   * @param {Object} condition - The condition to match the records for update.
   * @param {Object} data - The new data to update the records.
   * @param {Object} transaction - The transaction to associate with the update (optional).
   * @returns {Promise} A promise that resolves after updating the records.
   */
  async update(condition = {}, data, transaction = null) {
    return this.model.update(data, { where: condition, transaction })
  }

  /**
   * Deletes records from the database based on the provided condition.
   *
   * @param {Object} condition - The condition to match the records for deletion.
   * @param {Object} transaction - The transaction to associate with the deletion (optional).
   * @returns {Promise} A promise that resolves after deleting the records.
   */
  async delete(condition = {}, transaction = null) {
    return this.model.destroy({ where: condition, transaction })
  }

  /**
   * Counts the number of records in the database based on the provided condition.
   *
   * @param {Object} condition - The condition to match the records for counting.
   * @returns {Promise} A promise that resolves with the count of records.
   * @throws {RepositoryException} If an error occurs while counting the records.
   */
  async count(condition = {}) {
    try {
      return this.model.count({ where: condition })
    } catch (error) {
      throw new RepositoryException('Error counting records', error)
    }
  }

  /**
   * Finds the first record that matches the provided condition, or creates a new record with the given defaults.
   *
   * @param {Object} condition - The condition to match the record.
   * @param {Object} defaults - The default values for the new record if not found.
   * @param {Object} transaction - The transaction to associate with the operation (optional).
   * @returns {Object} An object containing the found or created record and a boolean indicating if it was created.
   */
  async firstOrCreate(condition, defaults, transaction = null) {
    const [record, created] = await this.model.findOrCreate({
      where: condition,
      defaults: defaults,
      transaction
    })
    return { record, created }
  }

  /**
   * Finds the first record that matches the provided condition, or creates a new record with the given defaults.
   *
   * @param {Object} condition - The condition to match the record.
   * @returns {Object} The found record or a newly created record.
   */
  async firstOrNew(condition) {
    const record = await this.model.findOne({ where: condition })
    if (!record) {
      return this.model.build(condition)
    }
    return record
  }

  /**
   * Retrieves records from the database based on a column and an array of values with optional additional conditions.
   *
   * @param {string} column - The column to match the values against.
   * @param {Array} values - The array of values to match in the specified column.
   * @param {Object} additionalCondition - Additional conditions to apply to the query.
   * @returns {Promise} A promise that resolves with the retrieved records.
   */
  async getByWhereIn(column, values = [], additionalCondition = {}) {
    return this.model.findAll({
      where: {
        [column]: { [Op.in]: values },
        ...additionalCondition
      }
    })
  }

  /**
   * Finds a record by its ID with optional relations.
   *
   * @param {number} id - The ID of the record to find.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @returns {Promise} A promise that resolves with the found record.
   * @throws {RepositoryException} If the record with the given ID is not found.
   */
  async findOrFail(id, withRelations = []) {
    const record = await this.model.findByPk(id, { include: withRelations })
    if (!record) {
      throw new RepositoryException(NOT_FOUND, `Record not found with ID ${id}`)
    }
    return record
  }

  /**
   * Deletes a record from the database permanently based on the provided condition.
   *
   * @param {Object} condition - The condition to match the record for deletion.
   * @param {Object} transaction - The transaction to associate with the deletion (optional).
   * @returns {Promise} A promise that resolves after permanently deleting the record.
   */
  async forceDelete(condition, transaction = null) {
    const record = await this.model.findOne({ where: condition, paranoid: false })
    if (record) {
      return await record.destroy({ force: true, transaction })
    }
    return false
  }

  /**
   * Restores a record in the database based on the provided condition.
   *
   * @param {Object} condition - The condition to match the record for restoration.
   * @param {Object} transaction - The transaction to associate with the restoration (optional).
   * @returns {Promise} A promise that resolves after restoring the record.
   * @throws {RepositoryException} If the record to restore is not found.
   */
  async restore(condition, transaction = null) {
    const record = await this.model.findOne({ where: condition, paranoid: false })
    if (!record) {
      throw new RepositoryException(NOT_FOUND, 'Record not found')
    }
    return await record.restore({ transaction })
  }

  /**
   * Finds and counts all records from the database based on the provided condition and optional relations.
   *
   * @param {Object} condition - The condition to match the records.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @param {Object} pagination - The pagination settings for limiting and offsetting the results.
   * @param {number} pagination.limit - The maximum number of records to retrieve.
   * @param {number} pagination.offset - The number of records to skip before starting to return data.
   * @returns {Promise} A promise that resolves with an object containing the found records and the total count.
   */
  async findAndCountAll(condition = {}, withRelations = [], pagination = { limit: 10, offset: 0 }) {
    const { limit, offset } = pagination
    return this.model.findAndCountAll({ where: condition, include: withRelations, limit, offset })
  }
}

export default BaseRepository
