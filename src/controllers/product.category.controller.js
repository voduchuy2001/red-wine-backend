import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export default class ProductCategoryController {
  constructor(productCategoryService) {
    this.productCategoryService = productCategoryService
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
      const categories = await this.productCategoryService.index(options)

      if (!categories) {
        return HttpHelper.successResponse(res, NOT_FOUND, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success, categories)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async create(req, res) {
    const data = req.body

    try {
      const category = await this.productCategoryService.create(data)

      if (!category) {
        return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async show(req, res) {
    const { id } = req.params

    try {
      const category = await this.productCategoryService.findById(id)

      if (!category) {
        return HttpHelper.successResponse(res, NOT_FOUND, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success, category)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }

  async update(req, res) {
    const data = { ...req.params, ...req.body }
    const { id, ...categoryData } = data

    try {
      const updated = await this.productCategoryService.update(id, categoryData)

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
      const category = await this.productCategoryService.remove(id)

      if (!category) {
        return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
