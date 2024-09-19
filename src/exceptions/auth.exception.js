export default class AuthException extends Error {
  constructor(status, message = __('Auth Error'), error) {
    super(message)
    this.status = status
    this.error = error
  }
}
