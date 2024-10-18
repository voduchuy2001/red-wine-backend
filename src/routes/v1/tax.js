import TaxController from '@controllers/tax.controller'
import validate from '@middlewares/validation'
import TaxRepository from '@repositories/tax.repository'
import createTaxRequest from '@requests/create.tax.request'
import getTaxRequest from '@requests/get.tax.request'
import TaxService from '@services/tax.service'
import express from 'express'
import authenticated from '@middlewares/authenticated'
import updateTaxRequest from '@requests/update.tax.request'

const router = express.Router()

const taxRepository = new TaxRepository()
const taxService = new TaxService(taxRepository)
const taxController = new TaxController(taxService)

router.get('/', authenticated, validate(getTaxRequest), taxController.index.bind(taxController))
router.post('/', authenticated, validate(createTaxRequest), taxController.create.bind(taxController))
router.delete('/:id', authenticated, taxController.delete.bind(taxController))
router.put('/:id', authenticated, validate(updateTaxRequest), taxController.update.bind(taxController))

export default router
