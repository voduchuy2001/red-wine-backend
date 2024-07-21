'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ProductAttributes extends Model {
    static associate(models) {}
  }
  ProductAttributes.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ProductAttributes'
    }
  )
  return ProductAttributes
}
