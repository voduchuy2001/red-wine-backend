'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Option extends Model {
    static associate(models) {
      this.hasMany(models.OptionValue, { foreignKey: 'optionId', as: 'optionValues' })
    }
  }
  Option.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Option'
    }
  )
  return Option
}
