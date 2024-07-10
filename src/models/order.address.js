'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class OrderAddress extends Model {
    static associate(models) {}
  }
  OrderAddress.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      country: DataTypes.STRING,
      province: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      address: DataTypes.STRING,
      orderId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'OrderAddress'
    }
  )
  return OrderAddress
}
