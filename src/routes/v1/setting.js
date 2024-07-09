import express from 'express'
import { validate } from '@middlewares/validation'
import { vnpaySetting } from '@requests/setting.request'
import { settingController } from '@di/container'

const router = express.Router()

router.patch('/vnpay-setting', validate(vnpaySetting()), settingController.vnpaySetting.bind(settingController))

export default router
