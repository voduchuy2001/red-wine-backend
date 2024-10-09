import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class BrandController extends BaseController {
  constructor(brandService) {
    super()
    this.brandService = brandService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const brands = await this.brandService.getBrands(data)
      return this.json(res, OK, __('Get data success'), brands)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const data = req.body
    const logo = req.file

    try {
      await this.brandService.createBrand(data, logo)
      return this.json(res, OK, __('success'))
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const { id } = req.params
    const data = req.body
    const logo = req.file

    try {
      await this.brandService.updateBrand(id, data, logo)
      return this.json(res, OK, __('success'))
    } catch (error) {
      next(error)
    }
  }
}

export default BrandController
