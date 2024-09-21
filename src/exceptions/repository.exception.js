class RepositoryException extends Error {
  constructor(status = 400, message = __('Repository exception')) {
    super(status, message)
  }
}

export default RepositoryException
