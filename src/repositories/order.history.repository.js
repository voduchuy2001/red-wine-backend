import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class OrderHistoryRepository extends BaseRepository {
  constructor() {
    super(db.OrderHistory)
  }
}
