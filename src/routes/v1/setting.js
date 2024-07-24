import express from 'express'
import { validate } from '@middlewares/validation'
import { vnpSetting } from '@requests/setting.request'
import { auth } from '@middlewares/authenticate'
import SettingController from '@controllers/setting.controller'

const router = express.Router()
const settingController = new SettingController()

router.patch('/vnpay-setting', auth, validate(vnpSetting()), settingController.vnpSetting)

export default router
