'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {}
  }
  Media.init(
    {
      mediable: DataTypes.STRING,
      mediableId: DataTypes.BIGINT,
      type: DataTypes.STRING,
      mimeType: DataTypes.STRING,
      size: DataTypes.INTEGER,
      url: DataTypes.STRING,
      alt: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Media'
    }
  )
  return Media
}
