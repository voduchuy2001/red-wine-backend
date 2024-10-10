import express from 'express'
import validate from '@middlewares/validation'
import auth from '@middlewares/authenticated'
import SettingController from '@controllers/backend/setting.controller'
import SettingService from '@services/setting.service'
import vnpaySettingRequest from '@requests/vnpay.setting.request'

const router = express.Router()
const settingService = new SettingService()
const settingController = new SettingController(settingService)

router.patch('/vnpay-setting', auth, validate(vnpaySettingRequest), settingController.vnpSetting.bind(settingController))

export default router
