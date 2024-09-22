import BaseService from '@services/base.service'

class ProductService extends BaseService {
  constructor(productRepository) {
    super(productRepository)
  }
}

export default ProductService
