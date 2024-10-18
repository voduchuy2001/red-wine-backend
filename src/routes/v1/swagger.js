import express from 'express'
import validate from '@middlewares/validation'
import { limiter } from '@config/rate.limit'
import { authenticate } from '@middlewares/swagger'
import SwaggerAuthController from '@controllers/swagger.auth.controller'
import SwaggerAuthService from '@services/swagger.auth.service'
import swaggerRequest from '@requests/swagger.request'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 5)
const swaggerAuthService = new SwaggerAuthService()
const swaggerAuthController = new SwaggerAuthController(swaggerAuthService)

router.get('/swagger-sign-in', authenticate, swaggerAuthController.showLoginForm.bind(swaggerAuthController))
router.post('/swagger-sign-in', authLimiter, validate(swaggerRequest), swaggerAuthController.login.bind(swaggerAuthController))

export default router
