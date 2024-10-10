'use strict'

import { Model } from 'sequelize'

class Setting extends Model {
  static associate({}) {}
}

export default (sequelize, { STRING, TEXT }) => {
  Setting.init(
    {
      key: STRING,
      value: TEXT
    },
    {
      sequelize,
      modelName: 'Setting',
      tableName: 'Settings'
    }
  )
  return Setting
}
