import bcrypt from 'bcryptjs'

const SALT = 10

export default class Bcrypt {
  static async hashPassword(password) {
    return bcrypt.hash(password, SALT)
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}
