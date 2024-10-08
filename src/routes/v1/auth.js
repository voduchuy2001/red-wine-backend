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
import AuthEvent from '@events/auth.event'
import LogoutController from '@controllers/auth/logout.controller'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 10)

const authEvent = new AuthEvent()
const userRepository = new UserRepository()
const authService = new AuthService(userRepository, authEvent)
const loginController = new LoginController(authService)
const registerController = new RegisterController(authService)
const authenticatedController = new AuthenticateController(authService)
const logoutController = new LogoutController(authService)

router.post('/login', authLimiter, validate(loginRequest), loginController.login.bind(loginController))
router.post('/logout', auth, logoutController.logout.bind(logoutController))
router.post('/register', validate(registerRequest), registerController.register.bind(registerController))
router.get('/authenticated', auth, authenticatedController.authenticate.bind(authenticatedController))

export default router
