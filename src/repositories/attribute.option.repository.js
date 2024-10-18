import BaseRepository from '@repositories/base.repository'
import db from '@models/index'

class AttributeOptionRepository extends BaseRepository {
  constructor() {
    super(db.AttributeOption)
  }
}

export default AttributeOptionRepository
