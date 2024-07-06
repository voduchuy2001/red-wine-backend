import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ProductHasProductCategory extends Model {
    static associate(models) {}
  }
  ProductHasProductCategory.init(
    {
      categoryId: DataTypes.BIGINT,
      productId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'ProductHasProductCategory',
      tableName: 'ProductHasProductCategories',
      timestamps: false
    }
  )
  return ProductHasProductCategory
}
