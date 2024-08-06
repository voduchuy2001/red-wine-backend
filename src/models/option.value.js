'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class OptionValue extends Model {
    static associate(models) {
      this.belongsToMany(models.Variant, { through: 'VariantOptions', as: 'variants', timestamps: false })
    }
  }
  OptionValue.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'OptionValue'
    }
  )
  return OptionValue
}
