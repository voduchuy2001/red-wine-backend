import express from 'express'
import { validate } from '@middlewares/validation'
import { limiter } from '@config/rate.limit'
import LoginController from '@controllers/auth/login.controller'
import RegisterController from '@controllers/auth/register.controller'
import AuthService from '@services/auth/auth.service'
import loginRequest from '@requests/login.request'
import registerRequest from '@requests/register.request'
import UserRepository from '@repositories/user.repository'
import { auth } from '@middlewares/authenticated'
import AuthenticateController from '@controllers/auth/authenticate.controller'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 10)

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const loginController = new LoginController(authService)
const registerController = new RegisterController(authService)

router.post('/login', authLimiter, validate(loginRequest), loginController.login.bind(loginController))
router.post('/register', validate(registerRequest), registerController.register.bind(registerController))
router.get('/authenticated', auth, authenticatedController.authenticate.bind(authenticatedController))

export default router
