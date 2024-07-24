import { ALLOWED_EXTENSIONS } from '@constants/file.extension'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const storageOption = process.env.STORAGE_LOCATION || 'disk'

const diskStorageConfig = {
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, '../storage/tmp')
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }
    cb(null, folderPath)
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname)
    const uniqueFilename = `${uuidv4()}${fileExt}`
    cb(null, uniqueFilename)
  }
}

const config = {
  storage: storageOption === 'memory' ? multer.memoryStorage() : multer.diskStorage(diskStorageConfig),

  fileFilter: function (req, file, callback) {
    const extensions = path.extname(file.originalname)

    if (!ALLOWED_EXTENSIONS.includes(extensions)) return callback(new multer.MulterError('INVALID_EXTENSION'), false)

    callback(null, true)
  },

  limits: {
    fileSize: 1024 * 1024 * 5
  }
}

const upload = multer(config)

export default upload
