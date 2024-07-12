import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import VNPayService from '@services/vnpay.service'
import HttpHelper from '@utils/http'

export default class OrderController {
  constructor(orderService) {
    this.orderService = orderService
  }

  async create(req, res) {
    const data = req.body

    try {
      const vnp = new VNPayService()
      const url = await vnp.generatePaymentUrl()
      console.log(url)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
