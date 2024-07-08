import express from 'express'
import { validate } from '@middlewares/validation'
import { orderController } from '@di/container'
import { create } from '@requests/order.request'

const router = express.Router()

router.post('/create-order', validate(create()), orderController.create.bind(orderController))

export default router
