import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

class UserRepository extends BaseRepository {
  constructor() {
    super(db.User)
  }

  async getPermissions(id) {
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

  async findByEmail(email) {
    return super.findOne({ where: { email } })
  }

  async updateLastLoginAt(id) {
    const current = new Date()
    return super.update(id, { lastLoginAt: current })
  }
}

export default UserRepository
