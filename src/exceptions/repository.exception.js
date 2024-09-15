export default class RepositoryException extends Error {
  constructor(status, message = __('Repository Error'), error) {
    super(message)
    this.status = status
    this.error = error
  }
}
