import LoginController from '@controllers/auth/login.controller'
import OAuthGoogleController from '@controllers/auth/google.oauth.controller'
import ProductController from '@controllers/product.controller'
import RegisterController from '@controllers/auth/register.controller'
import CategoryRepository from '@repositories/category.repository'
import ProductRepository from '@repositories/product.repository'
import UserRepository from '@repositories/user.repository'
import AuthService from '@services/auth/auth.service'
import OAuthGoogleService from '@services/auth/google.oauth.service'
import ProductService from '@services/product.service'
import SwaggerAuthController from '@controllers/auth/swagger.auth.controller'
import SwaggerAuthService from '@services/swagger/swagger.auth.service'

export const categoryRepository = new CategoryRepository()

export const productRepository = new ProductRepository()
export const productService = new ProductService(productRepository, categoryRepository)
export const productController = new ProductController(productService)

export const userRepository = new UserRepository()
export const authService = new AuthService(userRepository)
export const loginController = new LoginController(authService)
export const registerController = new RegisterController(authService)

export const googleOAuthService = new OAuthGoogleService(userRepository)
export const googleOAuthController = new OAuthGoogleController(googleOAuthService)

export const swaggerAuthService = new SwaggerAuthService()
export const swaggerAuthController = new SwaggerAuthController(swaggerAuthService)
