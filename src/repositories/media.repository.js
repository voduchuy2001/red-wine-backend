import db from '@models'
import BaseRepository from './base.repository'

class MediaRepository extends BaseRepository {
  constructor() {
    super(db.Media)
  }
}

export default MediaRepository
