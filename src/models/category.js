'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: 'ProductCategories',
        foreignKey: 'categoryId',
        as: 'products',
        timestamps: false
      })
    }
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
