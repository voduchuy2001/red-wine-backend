'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Variant extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })

      this.belongsToMany(models.OptionValue, { through: 'VariantOptions', as: 'optionValues', timestamps: false })
    }
  }
  Variant.init(
    {
      productId: DataTypes.BIGINT,
      sku: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      salePrice: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Variant'
    }
  )
  return Variant
}
