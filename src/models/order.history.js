'use strict'

import { Model } from 'sequelize'

class OrderHistory extends Model {
  static associate({ Order }) {
    this.belongsTo(Order, {
      foreignKey: 'orderId',
      as: 'order'
    })
  }
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
