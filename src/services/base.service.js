class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  /**
   * Lấy tất cả bản ghi (có thể kèm quan hệ)
   * @param {Array} withRelations
   * @returns {Promise<Array>}
   */
  async getAll(withRelations = []) {
    return this.repository.all(withRelations)
  }

  /**
   * Tìm bản ghi theo ID (có thể kèm quan hệ)
   * @param {Number} id
   * @param {Array} withRelations
   * @returns {Promise<Object>}
   */
  async findById(id, withRelations = []) {
    return this.repository.findById(id, withRelations)
  }

  /**
   * Tìm một bản ghi theo điều kiện (có thể kèm quan hệ)
   * @param {Object} condition
   * @param {Array} withRelations
   * @returns {Promise<Object>}
   */
  async findOne(condition, withRelations = []) {
    return this.repository.find(condition, withRelations)
  }

  /**
   * Tìm tất cả các bản ghi theo điều kiện (có thể kèm quan hệ)
   * @param {Object} condition
   * @param {Array} withRelations
   * @returns {Promise<Array>}
   */
  async findAllByCondition(condition, withRelations = []) {
    return this.repository.findByCondition(condition, withRelations)
  }

  /**
   * Tạo một bản ghi mới
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    return this.repository.create(data)
  }

  /**
   * Cập nhật bản ghi theo điều kiện
   * @param {Object} condition
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async update(condition, data) {
    return this.repository.update(condition, data)
  }

  /**
   * Xóa bản ghi theo điều kiện
   * @param {Object} condition
   * @returns {Promise<Number>} Số lượng bản ghi đã xóa
   */
  async delete(condition) {
    return this.repository.delete(condition)
  }

  /**
   * Đếm số lượng bản ghi theo điều kiện
   * @param {Object} condition
   * @returns {Promise<Number>}
   */
  async count(condition = {}) {
    return this.repository.count(condition)
  }

  /**
   * Tìm hoặc tạo bản ghi mới nếu không tồn tại
   * @param {Object} condition
   * @param {Object} defaults
   * @returns {Promise<Object>}
   */
  async firstOrCreate(condition, defaults) {
    return this.repository.firstOrCreate(condition, defaults)
  }

  /**
   * Tìm hoặc khởi tạo một bản ghi mới mà không lưu vào DB
   * @param {Object} condition
   * @returns {Promise<Object>}
   */
  async firstOrNew(condition) {
    return this.repository.firstOrNew(condition)
  }

  /**
   * Lấy các bản ghi với điều kiện "where in"
   * @param {String} column
   * @param {Array} values
   * @param {Object} additionalCondition
   * @returns {Promise<Array>}
   */
  async getByWhereIn(column, values, additionalCondition = {}) {
    return this.repository.getByWhereIn(column, values, additionalCondition)
  }

  /**
   * Tìm một bản ghi hoặc ném ngoại lệ nếu không tồn tại
   * @param {Number} id
   * @param {Array} withRelations
   * @returns {Promise<Object>}
   */
  async findOrFail(id, withRelations = []) {
    return this.repository.findOrFail(id, withRelations)
  }

  /**
   * Xóa vĩnh viễn một bản ghi
   * @param {Object} condition
   * @returns {Promise<Boolean>}
   */
  async forceDelete(condition) {
    return this.repository.forceDelete(condition)
  }

  /**
   * Khôi phục một bản ghi đã bị xóa (paranoid)
   * @param {Object} condition
   * @returns {Promise<Boolean>}
   */
  async restore(condition) {
    return this.repository.restore(condition)
  }

  /**
   * Phân trang kết quả với điều kiện và các quan hệ
   * @param {Number} page - Số trang hiện tại
   * @param {Number} pageSize - Số bản ghi mỗi trang
   * @param {Object} condition - Điều kiện lọc dữ liệu
   * @param {Array} withRelations - Các quan hệ cần load
   * @returns {Promise<Object>} - Trả về đối tượng chứa kết quả và thông tin phân trang
   */
  async paginate(page = 1, pageSize = 10, condition = {}, withRelations = []) {
    const offset = (page - 1) * pageSize
    const { count: totalItems, rows: data } = await this.repository.model.findAndCountAll({
      where: condition,
      include: withRelations,
      limit: pageSize,
      offset: offset
    })

    return {
      data,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize)
      }
    }
  }
}

export default BaseService
