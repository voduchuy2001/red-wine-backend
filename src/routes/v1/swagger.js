import express from 'express'
import { validate } from '@middlewares/validation'
import { swaggerAuthController } from '@di/container'
import { limiter } from '@config/rate.limit'
import { swagger } from '@requests/swagger.request'
import { authenticate } from '@middlewares/swagger'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 5)

router.get('/swagger-sign-in', authenticate, swaggerAuthController.showLoginForm.bind(swaggerAuthController))
router.post('/swagger-sign-in', authLimiter, validate(swagger()), swaggerAuthController.login.bind(swaggerAuthController))

export default router
