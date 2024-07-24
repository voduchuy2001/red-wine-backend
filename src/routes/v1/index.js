import express from 'express'
import auth from '@routes/v1/auth'
import googleOAuth from '@routes/v1/google.oauth'
import swaggerAuth from '@routes/v1/swagger'
import setting from '@routes/v1/setting'
import WelcomeController from '@controllers/welcome.controller'

const router = express.Router()
const welcomeController = new WelcomeController()

router.use('/', auth)
router.use('/', googleOAuth)
router.use('/', swaggerAuth)
router.use('/', setting)
router.get('/', welcomeController.index.bind(welcomeController))

export default router
