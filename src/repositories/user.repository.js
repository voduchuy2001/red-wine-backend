import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class UserRepository extends BaseRepository {
  constructor() {
    super(db.User)
  }

  async getUserPermissions(id) {
    return await super.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.Role,
          as: 'roles',
          attributes: ['id', 'name', 'code'],
          required: false,
          include: {
            model: db.Permission,
            as: 'permissions',
            attributes: ['id', 'code', 'name', 'description'],
            required: false,
            through: { attributes: [] }
          }
        },
        {
          model: db.Permission,
          as: 'permissions',
          attributes: ['id', 'code', 'name', 'description'],
          required: false,
          through: { attributes: [] }
        }
      ]
    })
  }
}
