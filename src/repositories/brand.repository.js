import db from '@models/index'
import BaseRepository from './base.repository'

export default class BrandRepository extends BaseRepository {
  constructor() {
    super(db.Brand)
  }
}
