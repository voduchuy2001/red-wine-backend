import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export default class OrderController {
  constructor(orderService) {
    this.orderService = orderService
  }

  async create(req, res) {
    const data = req.body

    try {
      const order = await this.orderService.create(data)

      if (!order) {
        return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure)
      }

      return HttpHelper.successResponse(res, OK, MESSAGES.success)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
