export default class HttpHelper {
  static response(status, message, data) {
    return { status, message, data }
  }

  static successResponse(res, status, message, data) {
    return res.status(status).json(HttpHelper.response(status, message, data))
  }

  static errorResponse(res, status, message, error) {
    return res.status(status).json(HttpHelper.response(status, message, error))
  }
}
