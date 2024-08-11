import CategoryController from '@controllers/category.controller'
import { auth } from '@middlewares/authenticate'
import { validate } from '@middlewares/validation'
import CategoryRepository from '@repositories/category.repository'
import MediaRepository from '@repositories/media.repository'
import { createCategoryRequest } from '@requests/create.category.request'
import CategoryService from '@services/category.service'
import express from 'express'

const router = express.Router()
const categoryRepository = new CategoryRepository()
const mediaRepository = new MediaRepository()
const categoryService = new CategoryService(categoryRepository, mediaRepository)
const categoryController = new CategoryController(categoryService)

router.get('/categories', auth, categoryController.index.bind(categoryController))
router.post('/category', auth, validate(createCategoryRequest), categoryController.create.bind(categoryController))

export default router
