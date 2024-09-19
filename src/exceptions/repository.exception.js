import HttpException from '@exceptions/http.exception'

export default class RepositoryException extends HttpException {
  constructor(status = 400, message = __('Repository exception')) {
    super(status, message)
  }
}
