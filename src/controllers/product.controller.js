import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import BaseController from '@controllers/base.controller'

export default class ProductController extends BaseController {
  constructor(productService) {
    super()
    this.productService = productService
  }

  async index(req, res) {
    try {
      const products = await this.productService.index(req.query)

      if (!products) {
        return this.json(res, NOT_FOUND, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success, products)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async create(req, res) {
    const { categoryIds, ...productData } = req.body

    try {
      const product = await this.productService.create(productData, categoryIds)

      if (!product) {
        return this.json(res, BAD_REQUEST, MESSAGES.failure)
      }

      return this.json(res, CREATED, MESSAGES.success)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async show(req, res) {
    const { id } = req.params

    try {
      const product = await this.productService.findById(id)

      if (!product) {
        return this.json(res, NOT_FOUND, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success, product)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async update(req, res) {
    const data = { ...req.params, ...req.body }

    try {
      const updated = await this.productService.update(data)

      if (!updated) {
        return this.json(res, BAD_REQUEST, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async destroy(req, res) {
    const { id } = req.params

    try {
      const product = await this.productService.remove(id)

      if (!product) {
        return this.json(res, BAD_REQUEST, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
