import express from 'express'
import { validate } from '@middlewares/validation'
import { login } from '@requests/login.request'
import { loginController, registerController } from '@di/container'
import { register } from '@requests/register.request'
import { limiter } from '@config/rate.limit'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 5)

router.post('/login', authLimiter, validate(login()), loginController.login.bind(loginController))
router.post('/register', validate(register()), registerController.register.bind(registerController))

export default router
