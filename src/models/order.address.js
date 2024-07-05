'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class OrderAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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
