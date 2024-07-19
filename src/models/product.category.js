import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: models.ProductHasProductCategory,
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

  return ProductCategory
}
