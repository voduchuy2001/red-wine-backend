'use strict'

import { Model } from 'sequelize'

class Category extends Model {
  static associate({ Category, Product }) {
    this.belongsToMany(Product, {
      through: 'ProductCategories',
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

export default (sequelize, { BIGINT, STRING, INTEGER }) => {
  Category.init(
    {
      parentId: BIGINT,
      name: STRING,
      status: STRING,
      featured: INTEGER,
      order: INTEGER
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories'
    }
  )
  return Category
}
