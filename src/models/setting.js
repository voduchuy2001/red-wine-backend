'use strict'
import { Model } from 'sequelize'

class Setting extends Model {
  static associate(models) {}
}

export default (sequelize, { STRING, TEXT }) => {
  Setting.init(
    {
      key: STRING,
      value: TEXT
    },
    {
      sequelize,
      modelName: 'Setting'
    }
  )
  return Setting
}
