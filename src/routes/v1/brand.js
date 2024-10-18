import BrandController from '@controllers/brand.controller'
import auth from '@middlewares/authenticated'
import validate from '@middlewares/validation'
import BrandRepository from '@repositories/brand.repository'
import createBrandRequest from '@requests/create.brand.request'
import BrandService from '@services/brand.service'
import express from 'express'
import Multer from '@config/multer'
import getBrandsRequest from '@requests/get.brands.request'
import updateBrandRequest from '@requests/update.brand.request'

const router = express.Router()
const brandRepository = new BrandRepository()
const brandService = new BrandService(brandRepository)
const brandController = new BrandController(brandService)

router.get('/', auth, validate(getBrandsRequest), brandController.index.bind(brandController))
router.post('/', auth, Multer.uploadSingle('logo'), validate(createBrandRequest), brandController.create.bind(brandController))
router.put('/:id', auth, Multer.uploadSingle('logo'), validate(updateBrandRequest), brandController.update.bind(brandController))
router.delete('/:id', auth, brandController.delete.bind(brandController))

export default router
