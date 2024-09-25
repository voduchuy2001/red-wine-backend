'use strict'

import { Model } from 'sequelize'

class OrderItem extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {}
  }
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
      modelName: 'OrderItem'
    }
  )
  return OrderItem
}
