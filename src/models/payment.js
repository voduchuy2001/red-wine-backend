'use strict'

import { Model } from 'sequelize'

class Payment extends Model {
  static associate({}) {}
}

export default (sequelize, { BIGINT, DECIMAL, STRING }) => {
  Payment.init(
    {
      orderId: BIGINT,
      customerId: BIGINT,
      amount: DECIMAL,
      channel: STRING,
      status: STRING
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'Payments'
    }
  )
  return Payment
}
