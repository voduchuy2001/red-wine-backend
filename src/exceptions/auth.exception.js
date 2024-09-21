class AuthException extends Error {
  constructor(status = 400, message = __('Auth exception')) {
    super(status, message)
  }
}

export default AuthException
