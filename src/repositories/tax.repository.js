import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

class TaxRepository extends BaseRepository {
  constructor() {
    super(db.Tax)
  }
}

export default TaxRepository
