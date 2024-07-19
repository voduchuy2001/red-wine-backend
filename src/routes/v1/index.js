import express from 'express'
import product from '@routes/v1/product'
import auth from '@routes/v1/auth'
import googleOAuth from '@routes/v1/google.oauth'
import swaggerAuth from '@routes/v1/swagger'
import productCategory from '@routes/v1/product.category'
import setting from '@routes/v1/setting'
import welcomeController from '@controllers/welcome.controller'

const router = express.Router()

router.use('/', product)
router.use('/', productCategory)
router.use('/', auth)
router.use('/', googleOAuth)
router.use('/', swaggerAuth)
router.use('/', setting)
router.get('/', welcomeController.index)

export default router
