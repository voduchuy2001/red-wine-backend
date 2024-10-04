import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import Storage from '@utils/storage'
import MulterException from '@exceptions/multer.exception'
import { BAD_REQUEST, UNPROCESSABLE_ENTITY } from '@constants/http.status.code'

class Multer {
  constructor(storageOption, fileSize) {
    this.storageOption = storageOption || 'disk'
    this.defaultExtensions = this.defaultAllowedExtensions()
    this.fileSize = fileSize || 5 * 1024 * 1024
  }

  defaultAllowedExtensions() {
    return [
      '.png',
      '.gif',
      '.bmp',
      '.svg',
      '.wav',
      '.mp4',
      '.mov',
      '.avi',
      '.wmv',
      '.mp3',
      '.m4a',
      '.jpg',
      '.jpeg',
      '.mpga',
      '.webp',
      '.wma'
    ]
  }

  diskStorageConfig() {
    return {
      destination: (req, file, cb) => {
        const folderPath = Storage.storagePath('tmp')
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
  }

  fileFilter(allowedExtensions) {
    return (req, file, callback) => {
      const fileExt = path.extname(file.originalname).toLowerCase()

      if (!allowedExtensions.includes(fileExt)) {
        return callback(new MulterException(UNPROCESSABLE_ENTITY, 'INVALID_EXTENSION'), false)
      }

      callback(null, true)
    }
  }

  multerConfig(allowedExtensions) {
    const storageOptions = {
      memory: multer.memoryStorage(),
      disk: multer.diskStorage(this.diskStorageConfig())
    }
    return {
      storage: storageOptions[this.storageOption],
      fileFilter: this.fileFilter(allowedExtensions),
      limits: {
        fileSize: this.fileSize
      }
    }
  }

  uploadSingle(fieldName, allowedExtensions = this.defaultExtensions) {
    return multer(this.multerConfig(allowedExtensions)).single(fieldName)
  }

  uploadArray(fieldName, allowedExtensions = this.defaultExtensions, maxCount) {
    return multer(this.multerConfig(allowedExtensions)).array(fieldName, maxCount)
  }

  uploadFields(fields) {
    const configFields = fields.map((field) => ({
      name: field.name,
      maxCount: field.maxCount || 1
    }))

    return multer(this.multerConfig(fields.map((f) => f.extensions || this.defaultExtensions))).fields(configFields)
  }

  uploadAny(allowedExtensions = this.defaultExtensions) {
    return multer(this.multerConfig(allowedExtensions)).any()
  }
}

export default new Multer()
