import BaseService from './base.service'

class CategoryService extends BaseService {
  constructor(categoryRepository, mediaRepository) {
    super(categoryRepository)
  }
}

export default CategoryService
