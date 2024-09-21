'use strict'
import { Model } from 'sequelize'

class Brand extends Model {
  static associate({ Product }) {
    this.hasMany(Product, { foreignKey: 'brandId', as: 'products' })
  }
}

export default (sequelize, { STRING, TEXT, TINYINT }) => {
  Brand.init(
    {
      name: STRING,
      website: STRING,
      description: TEXT,
      status: STRING,
      featured: TINYINT,
      order: TINYINT
    },
    {
      sequelize,
      modelName: 'Brand'
    }
  )
  return Brand
}
