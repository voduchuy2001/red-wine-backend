import bcrypt from 'bcryptjs'

const SALT = 10

class Bcrypt {
  async hashPassword(password) {
    return bcrypt.hash(password, SALT)
  }

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}

export default new Bcrypt()
