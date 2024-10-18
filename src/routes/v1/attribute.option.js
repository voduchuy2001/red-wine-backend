import express from 'express'
import AttributeOptionController from '@controllers/attribute.option.controller'
import AttributeOptionService from '@services/attribute.option.service'
import authenticated from '@middlewares/authenticated'
import validate from '@middlewares/validation'
import getAttributeOptionRequest from '@requests/get.attribute.option.request'

const router = express.Router()

const attributeOptionRepository = new AttributeOptionController()
const attributeOptionService = new AttributeOptionService(attributeOptionRepository)
const attributeOptionController = new AttributeOptionController(attributeOptionService)

router.get('/', authenticated, validate(getAttributeOptionRequest), attributeOptionController.index.bind(attributeOptionController))

export default router
