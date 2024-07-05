import { ALLOWED_EXTENSIONS } from '@constants/file.extension'
import multer from 'multer'
import path from 'path'

export const multerConfig = {
  storage: multer.memoryStorage(),

  fileFilter: function (req, file, callback) {
    const extensions = path.extname(file.originalname)

    if (!ALLOWED_EXTENSIONS.includes(extensions)) callback(new multer.MulterError('INVALID_EXTENSION'), false)

    callback(null, true)
  },

  limits: {
    fileSize: 1024 * 1024 * 5
  }
}
