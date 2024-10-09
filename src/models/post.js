'use strict'

import { Model } from 'sequelize'

class Post extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  Post.init(
    {
      authorId: DataTypes.BIGINT,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.TEXT,
      status: DataTypes.STRING,
      featured: DataTypes.INTEGER,
      image: DataTypes.STRING,
      views: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'Posts'
    }
  )
  return Post
}
