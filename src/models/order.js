'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {}
  }
  Order.init(
    {
      userId: DataTypes.BIGINT,
      code: DataTypes.STRING,
      status: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      shippingAmount: DataTypes.DECIMAL,
      note: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Order'
    }
  )
  return Order
}
