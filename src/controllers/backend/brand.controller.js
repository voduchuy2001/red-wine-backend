import { OK } from '@constants/http.status.code'
import BaseController from '@controllers/base.controller'
import Storage from '@utils/storage'

class BrandController extends BaseController {
  constructor(brandService, imageService) {
    super()
    this.brandService = brandService
    this.imageService = imageService
  }

  async index(req, res, next) {
    const data = req.query

    try {
      const brands = await this.brandService.getBrands(data)
      return super.json(res, OK, __('Get data success'), brands)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    const data = req.body
    const logo = req.file

    try {
      let image = null
      if (logo) {
        const { filename, path: filePath } = logo
        const outputPath = Storage.publicPath('images/brand')
        image = await this.imageService.storeAs(filePath, outputPath, filename)
      }
      await this.brandService.createBrand(data, image)
      return super.json(res, OK, __('success'))
    } catch (error) {
      next(error)
    }
  }
}

export default BrandController
