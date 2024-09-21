'use strict'
import { Model } from 'sequelize'

class Variant extends Model {
  static associate({ OptionValue, Product }) {
    this.belongsTo(Product, { as: 'product', foreignKey: 'productId' })

    this.belongsToMany(OptionValue, { through: 'VariantOptions', as: 'optionValues', timestamps: false })
  }
}

export default (sequelize, { BIGINT, DECIMAL, INTEGER, STRING }) => {
  Variant.init(
    {
      productId: BIGINT,
      sku: STRING,
      price: DECIMAL,
      salePrice: DECIMAL,
      quantity: INTEGER
    },
    {
      sequelize,
      modelName: 'Variant'
    }
  )
  return Variant
}
