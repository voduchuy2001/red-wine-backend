import LoginController from '@controllers/auth/login.controller'
import OAuthGoogleController from '@controllers/auth/google.oauth.controller'
import ProductController from '@controllers/product.controller'
import RegisterController from '@controllers/auth/register.controller'
import ProductCategoryRepository from '@repositories/product.category.repository'
import ProductRepository from '@repositories/product.repository'
import UserRepository from '@repositories/user.repository'
import AuthService from '@services/auth/auth.service'
import OAuthGoogleService from '@services/auth/google.oauth.service'
import ProductService from '@services/product.service'
import SwaggerAuthController from '@controllers/auth/swagger.auth.controller'
import SwaggerAuthService from '@services/swagger/swagger.auth.service'
import ProductCategoryService from '@services/product.category.service'
import ProductCategoryController from '@controllers/product.category.controller'
import OrderRepository from '@repositories/order.repository'
import OrderService from '@services/order.service'
import OrderController from '@controllers/customer/order.controller'
import VNPayService from '@services/vnpay.service'
import SettingRepository from '@repositories/setting.repository'
import SettingService from '@services/setting.service'
import SettingController from '@controllers/setting.controller'
import OrderHistoryRepository from '@repositories/order.history.repository'
import OrderAddressRepository from '@repositories/order.address.repository'

export const productCategoryRepository = new ProductCategoryRepository()
export const productCategoryService = new ProductCategoryService(productCategoryRepository)
export const productCategoryController = new ProductCategoryController(productCategoryService)

export const productRepository = new ProductRepository()
export const productService = new ProductService(productRepository, productCategoryRepository)
export const productController = new ProductController(productService)

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

export const orderHistoryRepository = new OrderHistoryRepository()

export const orderAddressRepository = new OrderAddressRepository()

export const orderRepository = new OrderRepository()
export const orderService = new OrderService(orderRepository, orderAddressRepository, orderHistoryRepository)
export const orderController = new OrderController(orderService)
