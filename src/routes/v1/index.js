import express from 'express'
import auth from '@routes/v1/auth'
import googleOAuth from '@routes/v1/google.oauth'
import swaggerAuth from '@routes/v1/swagger'
import setting from '@routes/v1/setting'
import brand from '@routes/v1/brand'
import category from '@routes/v1/category'
import product from '@routes/v1/product'
import WelcomeController from '@controllers/welcome.controller'

const router = express.Router()
const welcomeController = new WelcomeController()

router.use('/', auth)
router.use('/', googleOAuth)
router.use('/', swaggerAuth)
router.use('/', setting)
router.use('/', brand)
router.use('/', category)
router.use('/', product)
router.get('/', welcomeController.index.bind(welcomeController))

export default router
