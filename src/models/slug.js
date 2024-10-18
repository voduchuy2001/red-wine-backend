'use strict'

import { Model } from 'sequelize'

class Slug extends Model {
  static associate({}) {}
}

export default (sequelize, { BIGINT, STRING }) => {
  Slug.init(
    {
      key: STRING,
      referenceType: STRING,
      referenceId: BIGINT,
      prefix: STRING
    },
    {
      sequelize,
      modelName: 'Slug',
      tableName: 'Slugs'
    }
  )
  return Slug
}
