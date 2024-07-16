import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class OrderAddressRepository extends BaseRepository {
  constructor() {
    super(db.OrderAddress)
  }
}
