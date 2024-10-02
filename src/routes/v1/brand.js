import BrandController from '@controllers/backend/brand.controller'
import { auth } from '@middlewares/authenticated'
import validate from '@middlewares/validation'
import BrandRepository from '@repositories/brand.repository'
import createBrandRequest from '@requests/create.brand.request'
import BrandService from '@services/backend/brand.service'
import express from 'express'
import ImageService from '@services/image.service'
import Multer from '@config/multer'

const router = express.Router()
const brandRepository = new BrandRepository()
const brandService = new BrandService(brandRepository)
const imageService = new ImageService()
const brandController = new BrandController(brandService, imageService)

router.get('/brand', auth, brandController.index.bind(brandController))
router.post('/brand', Multer.uploadSingle('logo', ['.png']), auth, validate(createBrandRequest), brandController.create.bind(brandController))

export default router
