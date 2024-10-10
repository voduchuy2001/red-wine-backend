import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import Storage from '@utils/storage'
import MulterException from '@exceptions/multer.exception'
import { UNPROCESSABLE_ENTITY } from '@constants/http.status.code'

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

  /**
   * Upload a single file for a specific field with allowed extensions.
   *
   * This method is used to upload a single file for a specified form field. You can define the allowed
   * file extensions for the upload to ensure only certain file types are accepted.
   *
   * @param {string} fieldName - The name of the form field for the file upload (required).
   * @param {Array<string>} [allowedExtensions=defaultExtensions] - List of allowed file extensions for the field (optional, defaults to system's default allowed extensions).
   *
   * Example usage:
   * const upload = multer.uploadSingle('profilePicture', ['.jpg', '.jpeg', '.png']);
   *
   * This allows uploading a single file for the 'profilePicture' field, with only .jpg, .jpeg, and .png extensions allowed.
   *
   * @returns {function} - Returns a middleware function that can be used in Express to handle single file uploads.
   */
  uploadSingle(fieldName, allowedExtensions = this.defaultExtensions) {
    return multer(this.multerConfig(allowedExtensions)).single(fieldName)
  }

  /**
   * Upload multiple files for a single field with specific allowed extensions and maximum count.
   *
   * This method is used to upload an array of files under a single form field name, with control over
   * the allowed file extensions and the maximum number of files.
   *
   * @param {string} fieldName - The name of the form field for file upload (required).
   * @param {Array<string>} [allowedExtensions=defaultExtensions] - List of allowed file extensions for the field (optional, defaults to system's default allowed extensions).
   * @param {number} maxCount - The maximum number of files allowed for this field (required).
   *
   * Example usage:
   * const upload = multer.uploadArray('photos', ['.jpg', '.png'], 10);
   *
   * This allows uploading up to 10 files for the 'photos' field, with only .jpg and .png extensions.
   *
   * @returns {function} - Returns a middleware function that can be used in Express to handle file uploads for an array of files.
   */
  uploadArray(fieldName, allowedExtensions = this.defaultExtensions, maxCount) {
    return multer(this.multerConfig(allowedExtensions)).array(fieldName, maxCount)
  }

  /**
   * Upload multiple files for different fields with specific configurations.
   * Allows you to specify the maximum number of files and allowed extensions for each field.
   *
   * @param {Array<Object>} fields - Array of field configuration objects.
   *
   * Each object in the array should have the following structure:
   *   - {string} name - The name of the form field for file upload (required).
   *   - {number} [maxCount=1] - Maximum number of files allowed for this field (optional, defaults to 1).
   *   - {Array<string>} [extensions] - List of allowed file extensions for this field (optional, defaults to system's default allowed extensions).
   *
   * Example usage:
   * const upload = multer.uploadFields([
   *   { name: 'images', maxCount: 5, extensions: ['.jpg', '.png', '.jpeg'] },
   *   { name: 'videos', maxCount: 2, extensions: ['.mp4', '.mov'] }
   * ]);
   *
   * This allows uploading up to 5 image files and 2 video files with specific extensions.
   *
   * @returns {function} - Returns a middleware function that can be used in Express to handle file uploads for multiple fields.
   */
  uploadFields(fields) {
    const configFields = fields.map((field) => ({
      name: field.name,
      maxCount: field.maxCount || 1
    }))

    return multer(this.multerConfig(fields.map((f) => f.extensions || this.defaultExtensions))).fields(configFields)
  }

  /**
   * Upload files for any field without specifying field names, with specific allowed extensions.
   *
   * This method allows uploading files from any field in the form, without the need to specify field names.
   * You can control the allowed file extensions for the upload, and all files from any form field will be processed.
   *
   * @param {Array<string>} [allowedExtensions=defaultExtensions] - List of allowed file extensions for the upload (optional, defaults to system's default allowed extensions).
   *
   * Example usage:
   * const upload = multer.uploadAny(['.jpg', '.png', '.mp4']);
   *
   * This allows uploading files from any field in the form, with only .jpg, .png, and .mp4 extensions allowed.
   *
   * @returns {function} - Returns a middleware function that can be used in Express to handle file uploads from any form field.
   */
  uploadAny(allowedExtensions = this.defaultExtensions) {
    return multer(this.multerConfig(allowedExtensions)).any()
  }
}

export default new Multer()
