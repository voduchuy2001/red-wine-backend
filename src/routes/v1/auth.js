import express from 'express'
import validate from '@middlewares/validation'
import { limiter } from '@config/rate.limit'
import LoginController from '@controllers/auth/login.controller'
import RegisterController from '@controllers/auth/register.controller'
import AuthService from '@services/auth/auth.service'
import loginRequest from '@requests/login.request'
import registerRequest from '@requests/register.request'
import UserRepository from '@repositories/user.repository'
import auth from '@middlewares/authenticated'
import AuthController from '@controllers/auth/auth.controller'
import LogoutController from '@controllers/auth/logout.controller'
import refreshTokenRequest from '@requests/refresh.token.request'
import logoutRequest from '@requests/logout.request'
import sendVerifyEmailRequest from '@requests/send.verify.email.request'
import VerificationController from '@controllers/auth/verification.controller'
import verifyEmailRequest from '@requests/verify.email.request'
import ForgotPasswordController from '@controllers/auth/forgot.password.controller'
import forgotPasswordRequest from '@requests/forgot.password.request'
import resetPasswordRequest from '@requests/reset.password.request'

const router = express.Router()
const authLimiter = limiter(5 * 60 * 1000, 10)

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const loginController = new LoginController(authService)
const registerController = new RegisterController(authService)
const authenticatedController = new AuthController(authService)
const logoutController = new LogoutController(authService)
const verificationController = new VerificationController(authService)
const forgotPasswordController = new ForgotPasswordController(authService)

router.post('/login', authLimiter, validate(loginRequest), loginController.login.bind(loginController))
router.post('/logout', auth, validate(logoutRequest), logoutController.logout.bind(logoutController))
router.post('/register', validate(registerRequest), registerController.register.bind(registerController))
router.get('/authenticated', auth, authenticatedController.auth.bind(authenticatedController))
router.post('/refresh-token', validate(refreshTokenRequest), authenticatedController.refreshToken.bind(authenticatedController))
router.post('/email/verify', validate(sendVerifyEmailRequest), verificationController.sendVerifyEmail.bind(verificationController))
router.post('/email/verified', validate(verifyEmailRequest), verificationController.verifyEmail.bind(verificationController))
router.post('/forgot-password', validate(forgotPasswordRequest), forgotPasswordController.sendResetLinkEmail.bind(forgotPasswordController))
router.post('/reset-password', validate(resetPasswordRequest), forgotPasswordController.resetPassword.bind(forgotPasswordController))

export default router
