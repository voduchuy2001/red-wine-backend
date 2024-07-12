import express from 'express'
import { validate } from '@middlewares/validation'
import { vnpSetting } from '@requests/setting.request'
import { settingController } from '@di/container'
import { auth } from '@middlewares/authenticate'

const router = express.Router()

router.patch('/vnpay-setting', auth, validate(vnpSetting()), settingController.vnpSetting.bind(settingController))

export default router
