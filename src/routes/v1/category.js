import express from 'express'
import { validate } from '@middlewares/validation'
import { create, destroy, index, show, update } from '@requests/category.request'
import { categoryController } from '@di/container'

const router = express.Router()

router.get('/categories', validate(index()), categoryController.index.bind(categoryController))
router.post('/create-category', validate(create()), categoryController.create.bind(categoryController))
router.get('/category/:id', validate(show()), categoryController.show.bind(categoryController))
router.put('/category-update/:id', validate(update()), categoryController.update.bind(categoryController))
router.delete('/category-delete/:id', validate(destroy()), categoryController.destroy.bind(categoryController))

export default router
