import { FILE_LIMITER } from '@constants/file.extension'
import { BAD_REQUEST } from '@constants/http.status.code'
import HttpHelper from '@utils/http'

export const multer = (error, req, res, next) => {
  return HttpHelper.json(res, BAD_REQUEST, __('failure'), FILE_LIMITER[error.code])
}
