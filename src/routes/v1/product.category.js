import express from 'express'
import { validate } from '@middlewares/validation'
import { create, destroy, index, show, update } from '@requests/category.request'
import { productCategoryController } from '@di/container'

const router = express.Router()

router.get('/categories', validate(index()), productCategoryController.index.bind(productCategoryController))
router.post('/create-category', validate(create()), productCategoryController.create.bind(productCategoryController))
router.get('/category/:id', validate(show()), productCategoryController.show.bind(productCategoryController))
router.put('/category-update/:id', validate(update()), productCategoryController.update.bind(productCategoryController))
router.delete('/category-delete/:id', validate(destroy()), productCategoryController.destroy.bind(productCategoryController))

export default router
