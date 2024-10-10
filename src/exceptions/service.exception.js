import { BAD_REQUEST } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

class ServiceException extends HttpException {
  constructor(status = BAD_REQUEST, message = __('Service exception')) {
    super(status, message)
  }
}

export default ServiceException
