import path from 'path'

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
}

export default new Storage()
