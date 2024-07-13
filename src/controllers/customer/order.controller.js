import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import { vnPayService } from '@di/container'
import HttpHelper from '@utils/http'

export default class OrderController {
  constructor(orderService) {
    this.orderService = orderService
  }

  async create(req, res) {
    try {
      const url = await vnPayService.generatePaymentUrl({
        vnp_Amount: 10000,
        vnp_IpAddr: '13.160.92.202',
        vnp_TxnRef: '0999399',
        vnp_OrderInfo: 'Pay order - 0999399'
      })

      console.log(url)

      const result = await vnPayService.verifyIpn(req.query)

      console.log(result)
    } catch (error) {
      return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message)
    }
  }
}
