import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'

class SystemException extends Error {
  constructor(status = INTERNAL_SERVER_ERROR, message = __('System exception')) {
    super(message)
    this.status = status
  }
}

export default SystemException
