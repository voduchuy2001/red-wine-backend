'use strict'

import { Model } from 'sequelize'

class Newsletter extends Model {
  static associate(models) {}
}

export default (sequelize, { STRING }) => {
  Newsletter.init(
    {
      email: STRING,
      name: STRING,
      status: STRING
    },
    {
      sequelize,
      modelName: 'Newsletter',
      tableName: 'Newsletters'
    }
  )
  return Newsletter
}
