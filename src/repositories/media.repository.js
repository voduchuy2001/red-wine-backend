import db from '@models/index'
import BaseRepository from './base.repository'

export default class MediaRepository extends BaseRepository {
  constructor() {
    super(db.Media)
  }

  async getMediaByProduct(productId) {
    return await this.findAll({
      where: {
        productId
      },
      include: [{ model: db.Product }]
    })
  }

  async getMediaById(mediaId) {
    return await this.findByPk(mediaId)
  }

  async deleteMedia(mediaId) {
    return await this.destroy({
      where: {
        id: mediaId
      }
    })
  }

  async deleteMediaByProductId(productId) {
    return await this.destroy({
      where: {
        mediableId: productId,
        mediableType: 'Product'
      }
    })
  }
}
