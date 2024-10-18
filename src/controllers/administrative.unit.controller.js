import BaseController from '@controllers/base.controller'
import { OK } from '@constants/http.status.code'

class AdministrativeController extends BaseController {
  constructor(administrativeUnitService) {
    super()
    this.administrativeUnitService = administrativeUnitService
  }

  provinces(req, res, next) {
    try {
      const provinces = this.administrativeUnitService.provinces()
      return this.json(res, OK, __('Success'), provinces)
    } catch (error) {
      next(error)
    }
  }

  districts(req, res, next) {
    const { provinceId } = req.params

    try {
      const districts = this.administrativeUnitService.districts(provinceId)
      return this.json(res, OK, __('Success'), districts)
    } catch (error) {
      next(error)
    }
  }

  wards(req, res, next) {
    const { districtId } = req.params

    try {
      const wards = this.administrativeUnitService.wards(districtId)
      return this.json(res, OK, __('Success'), wards)
    } catch (error) {
      next(error)
    }
  }
}

export default AdministrativeController
