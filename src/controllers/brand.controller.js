import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

export default class BrandController extends BaseController {
  constructor(brandService) {
    super()
    this.brandService = brandService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const categories = await this.brandService.index(data)
      return super.json(res, OK, __('Success'), categories)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const data = req.body

    try {
      await this.brandService.create(data)
      return super.json(res, OK, __('success'))
    } catch (error) {
      next(error)
    }
  }
}
