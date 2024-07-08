import express from 'express'
import { validate } from '@middlewares/validation'
import { create, destroy, index, show, update } from '@requests/setting.request'
import { settingController } from '@di/container'

const router = express.Router()

router.get('/products', validate(index()), settingController.index.bind(settingController))
router.post('/create-product', validate(create()), settingController.create.bind(settingController))
router.get('/product/:id', validate(show()), settingController.show.bind(settingController))
router.put('/product-update/:id', validate(update()), settingController.update.bind(settingController))
router.delete('/product-delete/:id', validate(destroy()), settingController.destroy.bind(settingController))

export default router
