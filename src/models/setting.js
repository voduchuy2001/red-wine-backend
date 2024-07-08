'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Setting extends Model {
    static associate(models) {}
  }
  Setting.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Setting'
    }
  )
  return Setting
}
