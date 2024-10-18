import { Op } from 'sequelize'
import RepositoryException from '@exceptions/repository.exception'
import { NOT_FOUND } from '@constants/http.status.code'

class BaseRepository {
  constructor(model) {
    this.model = model
  }

  /**
   * Retrieves all records from the database with optional relations and options.
   *
   * @param {Array} withRelations - The optional relations to include in the query.
   * @param {Object} options - The additional query options (e.g., order, limit, offset).
   * @returns {Promise} A promise that resolves with the retrieved records.
   * @throws {RepositoryException} If an error occurs while fetching the records.
   */
  async all(withRelations = [], options = {}) {
    try {
      return this.model.findAll({ include: withRelations, ...options })
    } catch (error) {
      throw new RepositoryException('Error fetching all records', error)
    }
  }

  /**
   * Finds a record by its ID with optional relations.
   *
   * @param {number} id - The ID of the record to find.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @param {Object} options - Additional query options.
   * @returns {Promise} A promise that resolves with the found record.
   * @throws {RepositoryException} If the record with the given ID is not found.
   */
  async findById(id, withRelations = [], options = {}) {
    const record = await this.model.findByPk(id, { include: withRelations, ...options })
    if (!record) {
      throw new RepositoryException(NOT_FOUND, `Record not found with ID ${id}`)
    }
    return record
  }

  /**
   * Finds a single record based on the provided condition with optional relations and options.
   *
   * @param {Object} condition - The condition to match the record.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @param {Object} options - Additional query options.
   * @returns {Promise} A promise that resolves with the found record.
   * @throws {RepositoryException} If an error occurs while fetching the record.
   */
  async find(condition = {}, withRelations = [], options = {}) {
    try {
      return this.model.findOne({ where: condition, include: withRelations, ...options })
    } catch (error) {
      throw new RepositoryException('Error fetching record', error)
    }
  }

  /**
   * Finds records based on the provided conditions with optional relations and options.
   *
   * @param {Object} condition - The conditions to match the records.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @param {Object} options - Additional query options.
   * @returns {Promise} A promise that resolves with the found records.
   * @throws {RepositoryException} If an error occurs while fetching the records.
   */
  async findByConditions(condition = {}, withRelations = [], options = {}) {
    try {
      return this.model.findAll({ where: condition, include: withRelations, ...options })
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
   * Finds a record by its ID with optional relations and options.
   *
   * @param {number} id - The ID of the record to find.
   * @param {Array} withRelations - The optional relations to include in the query.
   * @param {Object} options - Additional query options.
   * @returns {Promise} A promise that resolves with the found record.
   * @throws {RepositoryException} If the record with the given ID is not found.
   */
  async findOrFail(id, withRelations = [], options = {}) {
    const record = await this.model.findByPk(id, { include: withRelations, ...options })
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
   * Retrieves records from the database that match the specified condition,
   * along with related records, while also supporting pagination and sorting.
   *
   * @param {Object} condition - The condition to filter records.
   * @param {Array} withRelations - An array of relations to include in the results.
   * @param {Object} pagination - Pagination parameters.
   * @param {number} pagination.limit - The maximum number of records to return (default is 10).
   * @param {number} pagination.offset - The number of records to skip before starting to collect the result set (default is 0).
   * @param {Object} options - Additional options for the query.
   * @param {Array} options.order - An array of order clauses for sorting the results, where each clause is an array with a column name and direction (e.g., [['columnName', 'ASC']]).
   *
   * @returns {Promise<Object>} A promise that resolves to an object containing:
   *   - {Array} rows - The array of retrieved records.
   *   - {number} count - The total number of records matching the condition.
   *
   * @throws {Error} Throws an error if the query fails due to database issues or invalid parameters.
   */
  async findAndCountAll(condition = {}, withRelations = [], pagination = { limit: 10, offset: 0 }, options = {}) {
    const { limit, offset } = pagination
    const { order } = options

    return this.model.findAndCountAll({
      where: condition,
      include: withRelations,
      limit,
      offset,
      order,
      ...options
    })
  }
}

export default BaseRepository
