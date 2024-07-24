'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class OptionValue extends Model {
    static associate(models) {
      this.belongsTo(models.Option, { foreignKey: 'optionId', as: 'option' })

      this.hasMany(models.VariantOption, { foreignKey: 'optionValueId', as: 'variantOptions' })
    }
  }
  OptionValue.init(
    {
      optionId: DataTypes.BIGINT,
      value: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'OptionValue'
    }
  )
  return OptionValue
}
