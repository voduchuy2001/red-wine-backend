'use strict'
const { Model } = require('sequelize')

export default (sequelize, DataTypes) => {
  class VariantOption extends Model {
    static associate(models) {}
  }
  VariantOption.init(
    {
      variantId: DataTypes.BIGINT,
      optionValue: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'VariantOption'
    }
  )
  return VariantOption
}
