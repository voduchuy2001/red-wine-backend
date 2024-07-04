import SequelizePaginate from '@utils/paginate'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      const { Product, CategoryProduct } = models
      this.belongsToMany(Product, {
        through: CategoryProduct,
        foreignKey: 'categoryId',
        as: 'products'
      })
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      status: DataTypes.STRING,
      isFeatured: DataTypes.BOOLEAN,
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
