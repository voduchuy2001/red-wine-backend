import GoogleOAuthController from '@controllers/auth/google.oauth.controller'
import express from 'express'

const router = express.Router()
const googleOAuthController = new GoogleOAuthController()

router.get('/redirect/google', googleOAuthController.redirect)
router.get('/callback/google', googleOAuthController.callback)

export default router
