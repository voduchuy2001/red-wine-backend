'use strict'

import { Model } from 'sequelize'

class OrderAddress extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  OrderAddress.init(
    {
      orderId: DataTypes.BIGINT,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      province: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'OrderAddress',
      tableName: 'OrderAddresses'
    }
  )
  return OrderAddress
}
