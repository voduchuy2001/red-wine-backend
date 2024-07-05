'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {}
  }
  OrderProduct.init(
    {
      orderId: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      productId: DataTypes.BIGINT,
      productName: DataTypes.STRING,
      productImage: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'OrderProduct'
    }
  )
  return OrderProduct
}
