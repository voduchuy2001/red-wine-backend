import GoogleOAuthController from '@controllers/google.oauth.controller'
import UserRepository from '@repositories/user.repository'
import GoogleOAuthService from '@services/google.oauth.service'
import express from 'express'

const router = express.Router()
const userRepository = new UserRepository()
const googleOAuthService = new GoogleOAuthService(userRepository)
const googleOAuthController = new GoogleOAuthController(googleOAuthService)

router.get('/redirect/google', googleOAuthController.redirect.bind(googleOAuthController))
router.get('/callback/google', googleOAuthController.callback.bind(googleOAuthController))

export default router
