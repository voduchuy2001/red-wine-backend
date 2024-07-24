import express from 'express'
import { validate } from '@middlewares/validation'
import { limiter } from '@config/rate.limit'
import { swagger } from '@requests/swagger.request'
import { authenticate } from '@middlewares/swagger'
import SwaggerAuthController from '@controllers/auth/swagger.auth.controller'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 5)
const swaggerAuthController = new SwaggerAuthController()

router.get('/swagger-sign-in', authenticate, swaggerAuthController.showLoginForm)
router.post('/swagger-sign-in', authLimiter, validate(swagger()), swaggerAuthController.login)

export default router
