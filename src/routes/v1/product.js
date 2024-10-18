import ProductController from '@controllers/product.controller'
import auth from '@middlewares/authenticated'
import validate from '@middlewares/validation'
import ProductRepository from '@repositories/product.repository'
import createProductRequest from '@requests/create.product.request'
import ProductService from '@services/product.service'
import express from 'express'

const router = express.Router()
const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

router.get('/', auth, productController.index.bind(productController))
router.post('/', auth, validate(createProductRequest), productController.create.bind(productController))
router.get('/:id', productController.show.bind(productController))

export default router
