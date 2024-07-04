import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class CategoryProduct extends Model {
    static associate(models) {}
  }
  CategoryProduct.init(
    {
      categoryId: DataTypes.BIGINT,
      productId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'CategoryProduct',
      tableName: 'CategoryProducts',
      timestamps: false
    }
  )
  return CategoryProduct
}
