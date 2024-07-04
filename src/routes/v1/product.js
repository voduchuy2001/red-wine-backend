import express from 'express'
import { validate } from '@middlewares/validation'
import { create, destroy, index, show, update } from '@requests/product.request'
import { productController } from '@di/container'

const router = express.Router()

router.get('/products', validate(index()), productController.index.bind(productController))
router.post('/create-product', validate(create()), productController.create.bind(productController))
router.get('/product/:id', validate(show()), productController.show.bind(productController))
router.put('/product-update/:id', validate(update()), productController.update.bind(productController))
router.delete('/product-delete/:id', validate(destroy()), productController.destroy.bind(productController))

export default router
