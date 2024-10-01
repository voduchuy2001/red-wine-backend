'use strict'

import { Model } from 'sequelize'

class Brand extends Model {
  static associate({ Product, Media }) {
    this.hasMany(Product, {
      foreignKey: 'brandId',
      as: 'products'
    })

    this.hasOne(Media, {
      foreignKey: 'mediableId',
      scope: {
        mediableType: 'brand'
      },
      as: 'logo'
    })
  }
}

export default (sequelize, { STRING, TEXT, INTEGER }) => {
  Brand.init(
    {
      name: STRING,
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
