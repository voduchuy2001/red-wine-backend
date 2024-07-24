'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class VariantOption extends Model {
    static associate(models) {
      this.belongsTo(models.Variant, { foreignKey: 'variantId', as: 'variant' })

      this.belongsTo(models.OptionValue, { foreignKey: 'optionValueId', as: 'optionValue' })
    }
  }
  VariantOption.init(
    {
      variantId: DataTypes.BIGINT,
      optionValueId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'VariantOption'
    }
  )
  return VariantOption
}
