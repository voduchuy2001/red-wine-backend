'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {}
  }
  Brand.init(
    {
      name: DataTypes.STRING,
      website: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.STRING,
      featured: DataTypes.TINYINT
    },
    {
      sequelize,
      modelName: 'Brand'
    }
  )
  return Brand
}
