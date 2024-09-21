'use strict'
import { Model } from 'sequelize'

class Category extends Model {
  static associate({ Category, Product }) {
    this.belongsToMany(Product, {
      through: 'ProductCategory',
      foreignKey: 'categoryId',
      as: 'products',
      timestamps: false
    })

    this.belongsTo(Category, {
      foreignKey: 'parentId',
      as: 'parent'
    })

    this.hasMany(Category, {
      foreignKey: 'parentId',
      as: 'children'
    })
  }
}

export default (sequelize, { BIGINT, STRING, TINYINT }) => {
  Category.init(
    {
      parentId: BIGINT,
      name: STRING,
      status: STRING,
      featured: TINYINT,
      order: TINYINT
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )
  return Category
}
