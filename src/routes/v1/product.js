import express from 'express'
import { validate } from '@middlewares/validation'
import { create, destroy, retrieve, show, update } from '@requests/product.request'
import { productController } from '@di/container'

const router = express.Router()

router.get('/products', validate(retrieve()), productController.getProducts.bind(productController))
router.post('/create-product', validate(create()), productController.createProduct.bind(productController))
router.get('/product/:id', validate(show()), productController.getProduct.bind(productController))
router.put('/product-update/:id', validate(update()), productController.updateProduct.bind(productController))
router.delete('/product-delete/:id', validate(destroy()), productController.destroyProduct.bind(productController))

export default router
