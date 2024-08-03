'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class OptionValue extends Model {
    static associate(models) {
      this.belongsTo(models.ProductOption, { as: 'option', foreignKey: 'optionId' })
      this.belongsToMany(models.Variant, { through: 'VariantOptions', as: 'variants', timestamps: false })
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
