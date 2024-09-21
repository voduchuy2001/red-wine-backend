import HttpException from '@exceptions/http.exception'

class RepositoryException extends HttpException {
  constructor(status = 400, message = __('Repository exception')) {
    super(status, message)
  }
}

export default RepositoryException
