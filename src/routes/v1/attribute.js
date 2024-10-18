import express from 'express'
import auth from '@middlewares/authenticated'
import validate from '@middlewares/validation'
import AttributeController from '@controllers/attribute.controller'
import AttributeService from '@services/attribute.service'
import AttributeRepository from '@repositories/attribute.repository'
import getAttributeRequest from '@requests/get.attribute.request'
import createAttributeRequest from '@requests/create.attribute.request'
import updateAttributeRequest from '@requests/update.attribute.request'

const router = express.Router()

const attributeRepository = new AttributeRepository()
const attributeService = new AttributeService(attributeRepository)
const attributeController = new AttributeController(attributeService)

router.get('/', auth, validate(getAttributeRequest), attributeController.index.bind(attributeController))
router.post('/', auth, validate(createAttributeRequest), attributeController.create.bind(attributeController))
router.put('/:id', auth, validate(updateAttributeRequest), attributeController.update.bind(attributeController))
router.delete('/:id', auth, attributeController.delete.bind(attributeController))

export default router
