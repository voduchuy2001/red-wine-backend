class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  /**
   * Retrieves all records from the repository with optional relations.
   *
   * @param {Array} withRelations - An array of relations to be included in the query results.
   * @returns {Promise} A promise that resolves with all records fetched from the repository.
   */
  async getAll(withRelations = []) {
    return this.repository.all(withRelations)
  }

  /**
   * Finds a record by its ID from the repository with optional relations.
   *
   * @param {number} id - The ID of the record to find.
   * @param {Array} withRelations - An array of relations to be included in the query results.
   * @returns {Promise} A promise that resolves with the record fetched from the repository.
   */
  async find(id, withRelations = []) {
    return this.repository.findById(id, withRelations)
  }

  /**
   * Finds a single record from the repository based on the provided condition with optional relations.
   *
   * @param {Object} condition - The condition to match the record.
   * @param {Array} withRelations - An array of relations to be included in the query results.
   * @returns {Promise} A promise that resolves with the record fetched from the repository.
   */
  async findOne(condition, withRelations = []) {
    return this.repository.find(condition, withRelations)
  }

  /**
   * Finds all records from the repository based on the provided condition with optional relations.
   *
   * @param {Object} condition - The condition to match the records.
   * @param {Array} withRelations - An array of relations to be included in the query results.
   * @returns {Promise} A promise that resolves with all records fetched from the repository.
   */
  async findAll(condition = {}, withRelations = []) {
    return this.repository.findByConditions(condition, withRelations)
  }

  /**
   * Creates a new record in the repository.
   *
   * @param {Object} data - The data for the new record.
   * @param {Object} transaction - The transaction object (optional).
   * @returns {Promise} A promise that resolves with the newly created record.
   */
  async create(data, transaction = null) {
    return this.repository.create(data, { transaction })
  }

  /**
   * Updates records in the repository based on the provided condition and data.
   *
   * @param {Object} condition - The condition to match the records to be updated.
   * @param {Object} data - The new data to update the records with.
   * @param {Object} transaction - The transaction object (optional).
   * @returns {Promise} A promise that resolves after updating the records in the repository.
   */
  async update(condition, data, transaction = null) {
    return this.repository.update(condition, data, { transaction })
  }

  /**
   * Deletes records from the repository based on the provided condition.
   *
   * @param {Object} condition - The condition to match the records for deletion.
   * @param {Object} transaction - The transaction object (optional).
   * @returns {Promise} A promise that resolves after deleting the records from the repository.
   */
  async delete(condition, transaction = null) {
    return this.repository.delete(condition, { transaction })
  }

  /**
   * Counts the number of records in the repository based on the provided condition.
   *
   * @param {Object} condition - The condition to match the records for counting.
   * @returns {Promise} A promise that resolves with the count of records.
   */
  async count(condition = {}) {
    return this.repository.count(condition)
  }

  /**
   * Retrieves the first record from the repository that matches the provided condition,
   * or creates a new record with the given defaults if no match is found.
   *
   * @param {Object} condition - The condition to match the record.
   * @param {Object} defaults - The default values for creating a new record.
   * @param {Object} transaction - The transaction object (optional).
   * @returns {Promise} A promise that resolves with the first matched or newly created record.
   */
  async firstOrCreate(condition, defaults, transaction = null) {
    return this.repository.firstOrCreate(condition, defaults, { transaction })
  }

  /**
   * Retrieves the first record from the repository that matches the provided condition,
   * or creates a new record if no match is found.
   *
   * @param {Object} condition - The condition to match the record.
   * @param {Object} transaction - The transaction object (optional).
   * @returns {Promise} A promise that resolves with the first matched or newly created record.
   */
  async firstOrNew(condition, transaction = null) {
    return this.repository.firstOrNew(condition, { transaction })
  }

  /**
   * Retrieves records from the repository based on a column and an array of values with optional additional conditions.
   *
   * @param {string} column - The column to match the values against.
   * @param {Array} values - An array of values to match in the specified column.
   * @param {Object} additionalCondition - Additional conditions to apply to the query (default is an empty object).
   * @returns {Promise} A promise that resolves with the records fetched from the repository.
   */
  async getByWhereIn(column, values, additionalCondition = {}) {
    return this.repository.getByWhereIn(column, values, additionalCondition)
  }

  /**
   * Finds a record by its ID from the repository with optional relations.
   *
   * @param {number} id - The ID of the record to find.
   * @param {Array} withRelations - An array of relations to be included in the query results.
   * @returns {Promise} A promise that resolves with the record fetched from the repository.
   */
  async findOrFail(id, withRelations = []) {
    return this.repository.findOrFail(id, withRelations)
  }

  /**
   * Deletes records permanently from the repository based on the provided condition.
   *
   * @param {Object} condition - The condition to match the records for permanent deletion.
   * @param {Object} transaction - The transaction object (optional).
   * @returns {Promise} A promise that resolves after permanently deleting the records from the repository.
   */
  async forceDelete(condition, transaction = null) {
    return this.repository.forceDelete(condition, { transaction })
  }

  /**
   * Restores records in the repository based on the provided condition.
   *
   * @param {Object} condition - The condition to match the records for restoration.
   * @param {Object} transaction - The transaction object (optional).
   * @returns {Promise} A promise that resolves after restoring the records in the repository.
   */
  async restore(condition, transaction = null) {
    return this.repository.restore(condition, { transaction })
  }

  /**
   * Retrieves records from the repository with optional relations based on pagination parameters.
   *
   * @param {number} page - The page number for pagination (default is 1).
   * @param {number} pageSize - The number of records per page (default is 10).
   * @param {Object} condition - The condition to match the records.
   * @param {Array} withRelations - An array of relations to be included in the query results.
   * @returns {Promise} A promise that resolves with the paginated records fetched from the repository.
   */
  async paginate(page = 1, pageSize = 10, condition = {}, withRelations = []) {
    return this.repository.findAndCountAll(condition, withRelations, { limit: pageSize, offset: (page - 1) * pageSize })
  }
}

export default BaseService
