'use strict'

import { Model } from 'sequelize'

class Newsletter extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  Newsletter.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Newsletter',
      tableName: 'Newsletters'
    }
  )
  return Newsletter
}
