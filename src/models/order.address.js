'use strict'

import { Model } from 'sequelize'

class OrderAddress extends Model {
  static associate({}) {}
}

export default (sequelize, { BIGINT, STRING }) => {
  OrderAddress.init(
    {
      orderId: BIGINT,
      name: STRING,
      phone: STRING,
      email: STRING,
      province: STRING,
      district: STRING,
      ward: STRING,
      type: STRING
    },
    {
      sequelize,
      modelName: 'OrderAddress',
      tableName: 'OrderAddresses'
    }
  )
  return OrderAddress
}
