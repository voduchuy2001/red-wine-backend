import { ALLOWED_EXTENTIONS } from '@constants/file-extension'
import multer from 'multer'
import path from 'path'

export const multerConfig = {
  storage: multer.memoryStorage(),

  fileFilter: function (req, file, callback) {
    const extensions = path.extname(file.originalname)

    if (!ALLOWED_EXTENTIONS.includes(extensions)) callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false)

    callback(null, true)
  },

  limits: {
    fileSize: 1024 * 1024 * 5
  }
}
