import { CREATED, OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'

class TaxController extends BaseController {
  constructor(taxService) {
    super()
    this.taxService = taxService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const taxes = await this.taxService.getTaxes(data)
      return this.json(res, OK, 'Success', taxes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const data = req.body

    try {
      await this.taxService.createTax(data)
      return this.json(res, CREATED, 'Success')
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const { id } = req.params

    try {
      await this.taxService.deleteTax(id)
      return this.json(res, OK, __('Success'))
    } catch (error) {
      next(error)
    }
  }
}

export default TaxController
