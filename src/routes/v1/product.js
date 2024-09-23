import ProductController from '@controllers/backend/product.controller'
import { auth } from '@middlewares/authenticated'
import { validate } from '@middlewares/validation'
import ProductRepository from '@repositories/product.repository'
import createProductRequest from '@requests/create.product.request'
import productFilterRequest from '@requests/filter.product.request'
import ProductService from '@services/product.service'
import express from 'express'

const router = express.Router()
const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

router.get('/product', auth, validate(productFilterRequest), productController.index.bind(productController))
router.post('/product', auth, validate(createProductRequest), productController.create.bind(productController))
router.get('/product/:id', productController.show.bind(productController))

export default router
