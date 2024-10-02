import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import ServiceException from '@exceptions/service.exception'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'

class ImageService {
  async upload(fileInput, outputPath) {
    try {
      const dir = path.dirname(outputPath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      fs.writeFileSync(outputPath, fileInput)

      return outputPath
    } catch (error) {
      throw new ServiceException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async optimize(outputPath, options = { width: 800, format: 'jpeg', quality: 80 }) {
    try {
      await sharp(outputPath)
        .resize(options.width)
        .toFormat(options.format, { quality: options.quality })
        .toFile(outputPath)

      const optimizedFileSize = fs.statSync(outputPath).size
      return { optimizedFileSize, outputPath }
    } catch (error) {
      throw new ServiceException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async uploadAndOptimize(input, outputPath, options = { width: 800, format: 'jpeg', quality: 80 }) {
    try {
      const uploadPath = await this.upload(input, outputPath)
      const { optimizedFileSize, outputPath: optimizedOutputPath } = await this.optimize(uploadPath, options)

      return { optimizedFileSize, optimizedOutputPath }
    } catch (error) {
      throw new ServiceException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async storeAs(fileInput, outputPath, fileName) {
    try {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true })
      }

      const filePath = path.join(outputPath, fileName)
      const content = fs.readFileSync(fileInput)
      fs.writeFileSync(filePath, content)

      return fileName
    } catch (error) {
      throw new ServiceException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default ImageService
