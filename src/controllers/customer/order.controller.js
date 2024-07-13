import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export default class OrderController {
  constructor(orderService) {
    this.orderService = orderService
  }

  async create(req, res) {
    try {
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
