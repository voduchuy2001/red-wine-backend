import express from 'express'
import { validate } from '@middlewares/validation'
import { create, destroy, index, show, update } from '@requests/product.request'
import { productController } from '@di/container'
import { auth } from '@middlewares/authenticate'

const router = express.Router()

router.get('/products', auth, validate(index()), productController.index.bind(productController))
router.post('/create-product', auth, validate(create()), productController.create.bind(productController))
router.get('/product/:id', auth, validate(show()), productController.show.bind(productController))
router.put('/product-update/:id', auth, validate(update()), productController.update.bind(productController))
router.delete('/product-delete/:id', auth, validate(destroy()), productController.destroy.bind(productController))

export default router
