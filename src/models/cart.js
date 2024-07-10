'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {}
  }
  Cart.init(
    {
      userId: DataTypes.BIGINT,
      instance: DataTypes.STRING,
      content: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Cart'
    }
  )
  return Cart
}
