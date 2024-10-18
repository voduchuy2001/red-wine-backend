'use strict'

import { Model } from 'sequelize'

class OrderItem extends Model {
  static associate({ Order }) {
    this.belongsTo(Order, {
      foreignKey: 'orderId',
      as: 'order'
    })
  }
}

export default (sequelize, { BIGINT, DECIMAL, INTEGER }) => {
  OrderItem.init(
    {
      orderId: BIGINT,
      skuId: BIGINT,
      quantity: INTEGER,
      price: DECIMAL,
      salePrice: DECIMAL
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'OrderItems'
    }
  )
  return OrderItem
}
