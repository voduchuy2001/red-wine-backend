import BaseController from '@controllers/base.controller'
import { OK } from '@constants/http.status.code'

class AttributeOptionController extends BaseController {
  constructor(attributeOptionService) {
    super()
    this.attributeOptionService = attributeOptionService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const attributeOptions = await this.attributeOptionService.getAttributeOptions(data)
      return this.json(res, OK, __('Success'), attributeOptions)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }
}

export default AttributeOptionController
