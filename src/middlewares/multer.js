import { FILE_LIMITER } from '@constants/file.extension'
import { BAD_REQUEST } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'

export const multer = (error, req, res, next) => {
  return HttpHelper.errorResponse(res, BAD_REQUEST, MESSAGES.failure, FILE_LIMITER[error.code])
}
