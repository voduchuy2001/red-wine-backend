'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      // define association here
    }
  }
  ProductVariant.init(
    {
      productId: DataTypes.BIGINT,
      sku: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      salePrice: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
      isDefault: DataTypes.TINYINT
    },
    {
      sequelize,
      modelName: 'ProductVariant'
    }
  )
  return ProductVariant
}
