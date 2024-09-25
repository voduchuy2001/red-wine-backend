'use strict'

import { Model } from 'sequelize'

class OrderHistory extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  OrderHistory.init(
    {
      orderId: DataTypes.BIGINT,
      status: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'OrderHistory',
      tableName: 'OrderHistories'
    }
  )
  return OrderHistory
}
