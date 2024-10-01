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

export default (sequelize, DataTypes) => {
  OrderItem.init(
    {
      orderId: DataTypes.BIGINT,
      skuId: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      salePrice: DataTypes.DECIMAL
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'OrderItems'
    }
  )
  return OrderItem
}
