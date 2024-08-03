'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ProductOption extends Model {
    static associate(models) {
      this.hasMany(models.OptionValue, { foreignKey: 'optionId', as: 'optionValues' })
    }
  }
  ProductOption.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ProductOption'
    }
  )
  return ProductOption
}
