export default class ServiceException extends Error {
  constructor(status, message = __('Service Error'), error) {
    super(message)
    this.status = status
    this.error = error
  }
}
