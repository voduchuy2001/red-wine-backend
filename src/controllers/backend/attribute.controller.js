import BaseController from '@controllers/base.controller'
import { CREATED, OK } from '@constants/http.status.code'

class AttributeController extends BaseController {
  constructor(attributeService) {
    super()
    this.attributeService = attributeService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const attributes = await this.attributeService.getAttributes(data)
      return this.json(res, OK, __('Success'), attributes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const data = req.body

    try {
      await this.attributeService.createAttribute(data)
      return this.json(res, CREATED, __('Success'))
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const data = req.body
    const { id } = req.params

    try {
      await this.attributeService.updateAttribute(id, data)
      return this.json(res, CREATED, __('Success'))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const { id } = req.params

    try {
      await this.attributeService.deleteAttribute(id)
      return this.json(res, CREATED, __('Success'))
    } catch (error) {
      next(error)
    }
  }
}

export default AttributeController
