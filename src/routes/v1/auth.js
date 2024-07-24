import express from 'express'
import { validate } from '@middlewares/validation'
import { login } from '@requests/login.request'
import { register } from '@requests/register.request'
import { limiter } from '@config/rate.limit'
import LoginController from '@controllers/auth/login.controller'
import RegisterController from '@controllers/auth/register.controller'
import AuthService from '@services/auth/auth.service'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 5)

const authService = new AuthService()
const loginController = new LoginController(authService)
const registerController = new RegisterController(authService)

router.post('/login', authLimiter, validate(login()), loginController.login.bind(loginController))
router.post('/register', validate(register()), registerController.register.bind(registerController))

export default router
