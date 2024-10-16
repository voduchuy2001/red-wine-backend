import { BAD_REQUEST } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

class RepositoryException extends HttpException {
  constructor(status = BAD_REQUEST, message = __('Repository exception')) {
    super(status, message)
  }
}

export default RepositoryException
