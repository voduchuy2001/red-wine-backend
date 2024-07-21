'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {}
  }
  Category.init(
    {
      parentId: DataTypes.BIGINT,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      featured: DataTypes.TINYINT
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )
  return Category
}
