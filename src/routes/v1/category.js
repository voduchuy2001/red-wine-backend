import CategoryController from '@controllers/backend/category.controller'
import auth from '@middlewares/authenticated'
import validate from '@middlewares/validation'
import CategoryRepository from '@repositories/category.repository'
import createCategoryRequest from '@requests/create.category.request'
import CategoryService from '@services/backend/category.service'
import Multer from '@config/multer'
import express from 'express'
import updateCategoryRequest from '@requests/update.category.request'
import getCategoriesRequest from '@requests/get.categories.request'

const router = express.Router()
const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)

router.get('/category', auth, validate(getCategoriesRequest), categoryController.index.bind(categoryController))
router.post('/category', auth, Multer.uploadSingle('image'), validate(createCategoryRequest), categoryController.create.bind(categoryController))
router.put('/category/:id', auth, Multer.uploadSingle('image'), validate(updateCategoryRequest), categoryController.update.bind(categoryController))
router.delete('/category/:id', auth, categoryController.delete.bind(categoryController))

export default router
