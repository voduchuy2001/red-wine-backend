import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class OrderRepository extends BaseRepository {
  constructor() {
    super(db.Order)
  }
}
