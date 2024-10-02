import { FILE_LIMITER } from '@constants/file.extension'
import { BAD_REQUEST } from '@constants/http.status.code'
import MulterException from '@exceptions/multer.exception'

const multer = (error, req, res, next) => {
  throw new MulterException(BAD_REQUEST, FILE_LIMITER[error.code])
}

export default multer
