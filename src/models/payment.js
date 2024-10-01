'use strict'

import { Model } from 'sequelize'

class Payment extends Model {
  static associate({}) {}
}

export default (sequelize, DataTypes) => {
  Payment.init(
    {
      orderId: DataTypes.BIGINT,
      customerId: DataTypes.BIGINT,
      amount: DataTypes.DECIMAL,
      channel: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'Payments'
    }
  )
  return Payment
}
