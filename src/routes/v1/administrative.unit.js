import express from 'express'
import AdministrativeUnitController from '@controllers/administrative.unit.controller'
import AdministrativeUnitService from '@services/administrative.unit.service'

const router = express.Router()
const administrativeUnitService = new AdministrativeUnitService()
const administrativeUnitController = new AdministrativeUnitController(administrativeUnitService)

router.get('/province', administrativeUnitController.provinces.bind(administrativeUnitController))

export default router
