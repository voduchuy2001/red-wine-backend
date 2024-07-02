'use strict'
import SequelizePaginate from '@utils/paginate'
import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: models.CategoryProduct,
        foreignKey: 'categoryId',
        as: 'products'
      })
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      isFeatured: DataTypes.TINYINT,
      order: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )

  SequelizePaginate.paginate(Category)
  return Category
}
