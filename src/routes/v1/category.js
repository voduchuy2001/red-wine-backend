import CategoryController from '@controllers/backend/category.controller'
import { auth } from '@middlewares/authenticated'
import validate from '@middlewares/validation'
import CategoryRepository from '@repositories/category.repository'
import { createCategoryRequest } from '@requests/create.category.request'
import CategoryService from '@services/backend/category.service'
import express from 'express'

const router = express.Router()
const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)

router.get('/categories', auth, categoryController.index.bind(categoryController))
router.post('/category', auth, validate(createCategoryRequest), categoryController.create.bind(categoryController))

export default router
