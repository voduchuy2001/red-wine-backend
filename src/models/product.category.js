import SequelizePaginate from '@utils/paginate'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      const { Product, ProductHasProductCategory } = models

      this.belongsToMany(Product, {
        through: ProductHasProductCategory,
        foreignKey: 'categoryId',
        as: 'products'
      })
    }
  }
  ProductCategory.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      status: DataTypes.STRING,
      featured: DataTypes.BOOLEAN,
      order: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'ProductCategory'
    }
  )

  SequelizePaginate.paginate(ProductCategory)
  return ProductCategory
}
