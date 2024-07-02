import { MESSAGES } from '@constants/message'
import { userRepository } from '@di/container'
import { body } from 'express-validator'

export const login = () => [
  body('email')
    .notEmpty()
    .bail()
    .withMessage(MESSAGES.notEmpty)
    .isEmail()
    .bail()
    .withMessage(MESSAGES.isEmail)
    .custom(async (email) => {
      const existedUser = await userRepository.findOne({ where: { email } })

      if (!existedUser) throw new Error(MESSAGES.notFound)
      return true
    }),

  body('password').notEmpty().bail().withMessage(MESSAGES.notEmpty).isString().bail().withMessage(MESSAGES.isString)
]
