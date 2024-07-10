import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export default class ProductController {
  constructor(productService) {
    this.productService = productService
  }

  async index(req, res) {
    const { page, limit, search, categoryIds } = req.query
    const options = {
      page: parseInt(page),
      paginate: parseInt(limit),
      search,
      categoryIds
    }

    try {
      const products = await this.productService.index(options)

      if (!products) {
        return HttpHelper.successResponse(res, NOT_FOUND, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success, products)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async create(req, res) {
    const { categoryIds, ...productData } = req.body

    try {
      const product = await this.productService.create(productData, categoryIds)

      if (!product) {
        return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, CREATED, MESSAGES.success)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async show(req, res) {
    const { id } = req.params

    try {
      const product = await this.productService.findById(id)

      if (!product) {
        return HttpHelper.successResponse(res, NOT_FOUND, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success, product)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async update(req, res) {
    const data = { ...req.params, ...req.body }

    try {
      const updated = await this.productService.update(data)

      if (!updated) {
        return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async destroy(req, res) {
    const { id } = req.params

    try {
      const product = await this.productService.remove(id)

      if (!product) {
        return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
