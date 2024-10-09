'use strict'

import { Model } from 'sequelize'

class Brand extends Model {
  static associate({ Product }) {
    this.hasMany(Product, {
      foreignKey: 'brandId',
      as: 'products'
    })
  }
}

export default (sequelize, { STRING, TEXT, INTEGER }) => {
  Brand.init(
    {
      name: STRING,
      logo: STRING,
      website: STRING,
      description: TEXT,
      status: STRING,
      featured: INTEGER,
      order: INTEGER
    },
    {
      sequelize,
      modelName: 'Brand',
      tableName: 'Brands'
    }
  )
  return Brand
}
