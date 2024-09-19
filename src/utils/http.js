export default class HttpHelper {
  static json(res, status, message, data) {
    return res.status(status).json({ status, message, data })
  }
}
