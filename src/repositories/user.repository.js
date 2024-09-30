import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '@constants/http.status.code'
import RepositoryException from '@exceptions/repository.exception'
import db from '@models'
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
    const transaction = await db.sequelize.transaction()

    try {
      const current = new Date()
      const updated = await super.update(id, { lastLoginAt: current }, transaction)

      if (!updated) {
        throw new RepositoryException(NOT_FOUND, __('Can not update'))
      }

      await transaction.commit()
      return updated
    } catch (error) {
      await transaction.rollback()
      throw new RepositoryException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default UserRepository
