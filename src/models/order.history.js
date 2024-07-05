'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class OrderHistory extends Model {
    static associate(models) {}
  }
  OrderHistory.init(
    {
      action: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.BIGINT,
      orderId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'OrderHistory'
    }
  )
  return OrderHistory
}
