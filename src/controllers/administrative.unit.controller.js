import BaseController from '@controllers/base.controller'
import { OK } from '@constants/http.status.code'

export default class AdministrativeController extends BaseController {
  constructor(administrativeUnitService) {
    super()
    this.administrativeUnitService = administrativeUnitService
  }

  provinces(req, res, next) {
    try {
      const provinces = this.administrativeUnitService.provinces()
      return super.json(res, OK, __('Success'), provinces)
    } catch (error) {
      next(error)
    }
  }
}
