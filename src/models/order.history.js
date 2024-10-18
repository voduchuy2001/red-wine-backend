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

export default (sequelize, { BIGINT, STRING }) => {
  OrderHistory.init(
    {
      orderId: BIGINT,
      status: STRING,
      description: STRING
    },
    {
      sequelize,
      modelName: 'OrderHistory',
      tableName: 'OrderHistories'
    }
  )
  return OrderHistory
}
