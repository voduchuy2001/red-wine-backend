import path from 'path'
import sharp from 'sharp'
import fs from 'fs'
import ServiceException from '@exceptions/service.exception'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from '@constants/http.status.code'
import NotFoundException from '@exceptions/not.found.exception'
import SystemException from '@exceptions/system.exception'

class Storage {
  constructor() {
    this.basePublicPath = path.join(__dirname, '../public/')
    this.baseStoragePath = path.join(__dirname, '../storage/')
  }

  publicPath(relativePath = '') {
    return path.join(this.basePublicPath, relativePath)
  }

  storagePath(relativePath = '') {
    return path.join(this.baseStoragePath, relativePath)
  }

  ensureDirectoryExistence(filePath) {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  async upload(fileInput, outputPath) {
    try {
      this.ensureDirectoryExistence(outputPath)
      fs.writeFileSync(outputPath, fileInput)
      return outputPath
    } catch (error) {
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async optimize(outputPath, options = { width: 800, format: 'jpeg', quality: 80 }) {
    try {
      if (!outputPath || typeof outputPath !== 'string') {
        throw new ServiceException(BAD_REQUEST, __('Invalid output path provided'))
      }
      const tempFilePath = `${outputPath}.tmp`
      await sharp(outputPath)
        .resize(options.width)
        .toFormat(options.format, { quality: options.quality })
        .toFile(tempFilePath)

      const optimizedFileSize = fs.statSync(tempFilePath).size
      if (!optimizedFileSize) {
        throw new ServiceException(BAD_REQUEST, __('Failed to get file size after optimization'))
      }
      fs.renameSync(tempFilePath, outputPath)
      return { optimizedFileSize, outputPath }
    } catch (error) {
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async uploadAndOptimize(input, outputPath, options = { width: 800, format: 'jpeg', quality: 80 }) {
    try {
      const uploadPath = await this.upload(input, outputPath)
      return await this.optimize(uploadPath, options)
    } catch (error) {
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async storeAs(fileInput, outputPath, fileName) {
    try {
      this.ensureDirectoryExistence(path.join(outputPath, fileName))
      const filePath = path.join(outputPath, fileName)
      const content = fs.readFileSync(fileInput)
      fs.writeFileSync(filePath, content)
      return fileName
    } catch (error) {
      throw new ServiceException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async unlink(filePath, type = 'storage') {
    try {
      const basePath = type === 'public' ? this.basePublicPath : this.baseStoragePath
      const fullPath = path.join(basePath, filePath)

      if (!fs.existsSync(fullPath)) {
        throw new NotFoundException(NOT_FOUND, __('Not found file path: %s', fullPath))
      }

      await fs.promises.unlink(fullPath)
    } catch (error) {
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default new Storage()
