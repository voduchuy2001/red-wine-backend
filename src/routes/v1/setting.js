import express from 'express'
import { validate } from '@middlewares/validation'
import { vnpSetting } from '@requests/setting.request'
import { auth } from '@middlewares/authenticate'
import SettingController from '@controllers/setting.controller'
import SettingService from '@services/setting.service'

const router = express.Router()
const settingService = new SettingService()
const settingController = new SettingController(settingService)

router.patch('/vnpay-setting', auth, validate(vnpSetting), settingController.vnpSetting.bind(settingController))

export default router
