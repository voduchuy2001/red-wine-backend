import { Model } from 'sequelize'
import SequelizePaginate from '@utils/paginate'

export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      const { Category, CategoryProduct } = models
      Product.belongsToMany(Category, {
        through: CategoryProduct,
        foreignKey: 'productId',
        as: 'categories'
      })
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      content: DataTypes.TEXT,
      status: DataTypes.STRING,
      images: DataTypes.TEXT,
      order: DataTypes.INTEGER,
      isFeatured: DataTypes.TINYINT,
      price: DataTypes.DOUBLE,
      salePrice: DataTypes.DOUBLE,
      length: DataTypes.FLOAT,
      width: DataTypes.FLOAT,
      height: DataTypes.FLOAT,
      weight: DataTypes.FLOAT,
      barcode: DataTypes.STRING,
      views: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'Product'
    }
  )

  SequelizePaginate.paginate(Product)
  return Product
}
