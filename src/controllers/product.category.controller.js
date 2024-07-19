import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import BaseController from '@controllers/base.controller'

export default class ProductCategoryController extends BaseController {
  constructor(productCategoryService) {
    super()
    this.productCategoryService = productCategoryService
  }

  async index(req, res) {
    try {
      const categories = await this.productCategoryService.index(req.query)

      if (!categories) {
        return this.json(res, NOT_FOUND, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success, categories)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async create(req, res) {
    const data = req.body

    try {
      const category = await this.productCategoryService.create(data)

      if (!category) {
        return this.json(res, BAD_REQUEST, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async show(req, res) {
    const { id } = req.params

    try {
      const category = await this.productCategoryService.findById(id)

      if (!category) {
        return this.json(res, NOT_FOUND, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success, category)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async update(req, res) {
    const data = { ...req.params, ...req.body }
    const { id, ...categoryData } = data

    try {
      const updated = await this.productCategoryService.update(id, categoryData)

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
      const category = await this.productCategoryService.remove(id)

      if (!category) {
        return this.json(res, BAD_REQUEST, MESSAGES.failure)
      }

      return this.json(res, OK, MESSAGES.success)
    } catch (error) {
      return this.json(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
