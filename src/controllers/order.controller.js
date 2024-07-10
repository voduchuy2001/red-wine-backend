import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export default class OrderController {
  constructor(orderService, vnpayService) {
    this.orderService = orderService
    this.vnpayService = vnpayService
  }

  async create(req, res) {
    try {
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
