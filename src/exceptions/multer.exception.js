import { BAD_REQUEST } from '@constants/http.status.code'

class MulterException extends Error {
  constructor(status = BAD_REQUEST, message) {
    super(message)
    this.status = status
  }
}

export default MulterException
