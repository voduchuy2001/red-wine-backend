import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

export default class CategoryController extends BaseController {
  constructor(categoryService) {
    super()
    this.categoryService = categoryService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const categories = await this.categoryService.index(data)
      return super.json(res, OK, __('Success'), categories)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const data = req.body

    try {
      await this.categoryService.create(data)
      return super.json(res, OK, __('Success'))
    } catch (error) {
      next(error)
    }
  }
}
