import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from '@constants/http.status.code'
import BaseController from './base.controller'

export default class ProductController extends BaseController {
  constructor(productService) {
    super()
    this.productService = productService
  }

  async index(req, res) {
    const data = req.query

    try {
      const products = await this.productService.index(data)
      if (!products) {
        return super.json(res, NOT_FOUND, __('notFound'))
      }

      return super.json(res, OK, __('success'), products)
    } catch (error) {
      return super.json(res, INTERNAL_SERVER_ERROR, __('failure'), error.message)
    }
  }
}
