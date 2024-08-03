'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class OptionValue extends Model {
    static associate(models) {
      this.belongsTo(models.ProductOption, { foreignKey: 'optionId', as: 'option' })
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
