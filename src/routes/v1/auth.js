import express from 'express'
import { validate } from '@middlewares/validation'
import { limiter } from '@config/rate.limit'
import LoginController from '@controllers/auth/login.controller'
import RegisterController from '@controllers/auth/register.controller'
import AuthService from '@services/auth/auth.service'
import loginRequest from '@requests/login.request'
import registerRequest from '@requests/register.request'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 5)

const authService = new AuthService()
const loginController = new LoginController(authService)
const registerController = new RegisterController(authService)

router.post('/login', authLimiter, validate(loginRequest), loginController.login.bind(loginController))
router.post('/register', validate(registerRequest), registerController.register.bind(registerController))

export default router
