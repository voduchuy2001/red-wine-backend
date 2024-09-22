'use strict'

import { Model } from 'sequelize'

class Media extends Model {
  static associate(models) {}
}

export default (sequelize, { BIGINT, BOOLEAN, STRING }) => {
  Media.init(
    {
      mediableType: STRING,
      mediableId: BIGINT,
      url: STRING,
      type: STRING,
      isDefault: BOOLEAN,
      altText: STRING
    },
    {
      sequelize,
      modelName: 'Media',
      tableName: 'Media'
    }
  )
  return Media
}
