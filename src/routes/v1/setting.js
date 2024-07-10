import express from 'express'
import { validate } from '@middlewares/validation'
import { vnpaySetting } from '@requests/setting.request'
import { settingController } from '@di/container'
import { auth } from '@middlewares/authenticate'

const router = express.Router()

router.patch('/vnpay-setting', auth, validate(vnpaySetting()), settingController.vnpaySetting.bind(settingController))

export default router
