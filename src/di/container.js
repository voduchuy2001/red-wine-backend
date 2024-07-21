import LoginController from '@controllers/auth/login.controller'
import OAuthGoogleController from '@controllers/auth/google.oauth.controller'
import RegisterController from '@controllers/auth/register.controller'
import UserRepository from '@repositories/user.repository'
import AuthService from '@services/auth/auth.service'
import OAuthGoogleService from '@services/auth/google.oauth.service'
import SwaggerAuthController from '@controllers/auth/swagger.auth.controller'
import SwaggerAuthService from '@services/swagger/swagger.auth.service'
import VNPayService from '@services/vnpay.service'
import SettingRepository from '@repositories/setting.repository'
import SettingService from '@services/setting.service'
import SettingController from '@controllers/setting.controller'

export const userRepository = new UserRepository()
export const authService = new AuthService(userRepository)
export const loginController = new LoginController(authService)
export const registerController = new RegisterController(authService)

export const googleOAuthService = new OAuthGoogleService(userRepository)
export const googleOAuthController = new OAuthGoogleController(googleOAuthService)

export const swaggerAuthService = new SwaggerAuthService()
export const swaggerAuthController = new SwaggerAuthController(swaggerAuthService)

export const settingRepository = new SettingRepository()
export const settingService = new SettingService(settingRepository)
export const settingController = new SettingController(settingService)

export const vnPayService = new VNPayService(settingRepository)
