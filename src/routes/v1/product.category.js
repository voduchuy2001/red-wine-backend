import express from 'express'
import { validate } from '@middlewares/validation'
import { create, destroy, index, show, update } from '@requests/category.request'
import { productCategoryController } from '@di/container'
import { auth } from '@middlewares/authenticate'

const router = express.Router()

router.get('/categories', auth, validate(index()), productCategoryController.index.bind(productCategoryController))
router.post(
  '/create-category',
  auth,
  validate(create()),
  productCategoryController.create.bind(productCategoryController)
)
router.get('/category/:id', auth, validate(show()), productCategoryController.show.bind(productCategoryController))
router.put(
  '/category-update/:id',
  auth,
  validate(update()),
  productCategoryController.update.bind(productCategoryController)
)
router.delete(
  '/category-delete/:id',
  auth,
  validate(destroy()),
  productCategoryController.destroy.bind(productCategoryController)
)

export default router
