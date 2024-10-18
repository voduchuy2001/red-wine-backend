import BaseRepository from '@repositories/base.repository'
import db from '@models/index'

class AttributeRepository extends BaseRepository {
  constructor() {
    super(db.Attribute)
  }
}

export default AttributeRepository
