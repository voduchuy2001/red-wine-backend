import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'
class ProductController extends BaseController {
  constructor(productService) {
    super()
    this.productService = productService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const products = await this.productService.index(data)

      return super.json(res, OK, __('success'), products)
    } catch (error) {
      next(error)
    }
  }

  async show(req, res, next) {
    const { id } = req.params

    try {
      const product = await this.productService.show(id)

      return super.json(res, OK, __('success'), product)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const data = req.body

    try {
      await this.productService.create(data)

      return super.json(res, OK, __('success'))
    } catch (error) {
      next(error)
    }
  }
}

export default ProductController
