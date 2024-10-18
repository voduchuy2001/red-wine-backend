'use strict'

import { Model } from 'sequelize'

class Post extends Model {
  static associate(models) {}
}

export default (sequelize, { BIGINT, INTEGER, STRING, TEXT }) => {
  Post.init(
    {
      authorId: BIGINT,
      name: STRING,
      description: STRING,
      content: TEXT,
      status: STRING,
      featured: INTEGER,
      image: STRING,
      views: BIGINT
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'Posts'
    }
  )
  return Post
}
