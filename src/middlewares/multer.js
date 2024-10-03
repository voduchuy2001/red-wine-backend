import { FILE_LIMITER } from '@constants/file.extension'
import { BAD_REQUEST } from '@constants/http.status.code'

const multer = (error, req, res, next) => {
  return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: FILE_LIMITER[error.code] })
}

export default multer
