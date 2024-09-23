import BrandController from '@controllers/backend/brand.controller'
import { auth } from '@middlewares/authenticated'
import { validate } from '@middlewares/validation'
import BrandRepository from '@repositories/brand.repository'
import MediaRepository from '@repositories/media.repository'
import createBrandRequest from '@requests/create.brand.request'
import BrandService from '@services/brand.service'
import express from 'express'

const router = express.Router()
const brandRepository = new BrandRepository()
const mediaRepository = new MediaRepository()
const brandService = new BrandService(brandRepository, mediaRepository)
const brandController = new BrandController(brandService)

router.get('/brands', auth, brandController.index.bind(brandController))
router.post('/brand', auth, validate(createBrandRequest), brandController.create.bind(brandController))

export default router
