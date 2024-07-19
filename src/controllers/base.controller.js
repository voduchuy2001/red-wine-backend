export default class BaseController {
  json(res, status, message, data = null) {
    return res.status(status).json({ status, message, data })
  }

  view(res, viewName, data) {
    return res.render(viewName, data)
  }
}
