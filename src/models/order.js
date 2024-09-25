'use strict'

import { Model } from 'sequelize'

class Order extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  Order.init(
    {
      customerId: DataTypes.BIGINT,
      userId: DataTypes.BIGINT,
      code: DataTypes.STRING,
      status: DataTypes.STRING,
      total: DataTypes.DECIMAL
    },
    {
      sequelize,
      modelName: 'Order'
    }
  )
  return Order
}
