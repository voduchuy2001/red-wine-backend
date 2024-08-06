'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' })

      ProductVariant.belongsToMany(models.OptionValue, {
        through: 'VariantOptions',
        as: 'options',
        foreignKey: 'variantId'
      })
    }
  }
  ProductVariant.init(
    {
      productId: DataTypes.BIGINT,
      price: DataTypes.DECIMAL,
      salePrice: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'ProductVariant'
    }
  )
  return ProductVariant
}
