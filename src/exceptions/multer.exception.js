import { BAD_REQUEST } from '@constants/http.status.code'
import HttpException from '@exceptions/http.exception'

class MulterException extends HttpException {
  constructor(status = BAD_REQUEST, message = __('Multer exception')) {
    super(status, message)
  }
}

export default MulterException
