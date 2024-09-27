import { NOT_FOUND } from '@constants/http.status.code'

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  return res.status(NOT_FOUND).json({ status: NOT_FOUND, message: error.message })
}

export default notFound
