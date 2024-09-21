import HttpException from '@exceptions/http.exception'

class ServiceException extends HttpException {
  constructor(status = 400, message = __('Service exception')) {
    super(status, message)
  }
}

export default ServiceException
