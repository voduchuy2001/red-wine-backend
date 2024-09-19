import path from 'path'
import fs from 'fs'
import ServiceException from '@exceptions/service.exception'

export default class AdministrativeUnitService {
  getFile(fileName = '') {
    return path.join(__dirname, `../storage/data/${fileName}.json`)
  }

  provinces() {
    const filePath = this.getFile('vn_province')
    if (!fs.existsSync(filePath)) {
      throw new ServiceException(400, __('File not found'))
    }

    const jsonFile = fs.readFileSync(filePath, 'utf-8')

    return JSON.parse(jsonFile)
  }
}
