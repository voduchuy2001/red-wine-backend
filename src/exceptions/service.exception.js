import HttpException from '@exceptions/http.exception'

export default class ServiceException extends HttpException {
  constructor(status = 400, message = __('Service exception')) {
    super(status, message)
  }
}
