import ProductController from '@controllers/product.controller'
import { auth } from '@middlewares/authenticate'
import { validate } from '@middlewares/validation'
import ProductRepository from '@repositories/product.repository'
import productFilterRequest from '@requests/filter.product.request'
import ProductService from '@services/product.service'
import express from 'express'

const router = express.Router()
const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

router.get('/products', auth, validate(productFilterRequest()), productController.index.bind(productController))

export default router
