import TaxController from '@controllers/tax.controller'
import auth from '@middlewares/authenticated'
import validate from '@middlewares/validation'
import TaxRepository from '@repositories/tax.repository'
import createTaxRequest from '@requests/create.tax.request'
import getTaxRequest from '@requests/get.tax.request'
import TaxService from '@services/tax.service'
import express from 'express'

const router = express.Router()

const taxRepository = new TaxRepository()
const taxService = new TaxService(taxRepository)
const taxController = new TaxController(taxService)

router.get('/', auth, validate(getTaxRequest), taxController.index.bind(taxController))
router.post('/', auth, validate(createTaxRequest), taxController.create.bind(taxController))
router.delete('/:id', auth, taxController.delete.bind(taxController))

export default router
