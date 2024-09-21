class HttpException extends Error {
  constructor(status, message, error) {
    super(message)
    this.status = status
  }
}

export default HttpException
