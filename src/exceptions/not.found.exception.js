import { NOT_FOUND } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

class NotFoundException extends HttpException {
  constructor(status = NOT_FOUND, message = __('Not found exception')) {
    super(status, message)
  }
}

export default NotFoundException
