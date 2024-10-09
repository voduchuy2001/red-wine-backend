import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class CategoryController extends BaseController {
  constructor(categoryService) {
    super()
    this.categoryService = categoryService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const categories = await this.categoryService.getCategories(data)
      return this.json(res, OK, __('Success'), categories)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const data = req.body
    const image = req.file

    try {
      await this.categoryService.createCategory(data, image)
      return this.json(res, OK, __('Success'))
    } catch (error) {
      next(error)
    }
  }
}

export default CategoryController
