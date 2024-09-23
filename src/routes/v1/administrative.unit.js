import express from 'express'
import AdministrativeUnitController from '@controllers/backend/administrative.unit.controller'
import AdministrativeUnitService from '@services/administrative.unit.service'

const router = express.Router()
const administrativeUnitService = new AdministrativeUnitService()
const administrativeUnitController = new AdministrativeUnitController(administrativeUnitService)

router.get('/province', administrativeUnitController.provinces.bind(administrativeUnitController))
router.get('/district/:provinceId', administrativeUnitController.districts.bind(administrativeUnitController))
router.get('/ward/:districtId', administrativeUnitController.wards.bind(administrativeUnitController))

export default router
