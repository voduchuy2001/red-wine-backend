'use strict'
import { Model } from 'sequelize'

class Media extends Model {
  static associate(models) {}
}

export default (sequelize, { BIGINT, INTEGER, STRING }) => {
  Media.init(
    {
      mediableType: STRING,
      mediableId: BIGINT,
      type: STRING,
      mimeType: STRING,
      size: INTEGER,
      url: STRING,
      alt: STRING
    },
    {
      sequelize,
      modelName: 'Media'
    }
  )
  return Media
}
