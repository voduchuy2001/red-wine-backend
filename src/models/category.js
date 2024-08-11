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

      this.belongsTo(models.Category, {
        foreignKey: 'parentId',
        as: 'parent'
      })

      this.hasMany(models.Category, {
        foreignKey: 'parentId',
        as: 'children'
      })
    }
  }
  Category.init(
    {
      parentId: DataTypes.BIGINT,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      featured: DataTypes.TINYINT,
      order: DataTypes.TINYINT
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )
  return Category
}
