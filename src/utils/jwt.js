import 'dotenv/config'
import jwt from 'jsonwebtoken'

export default class JWT {
  static generate(data, expiresIn = '30d') {
    const key = process.env.JWT_SECRET_KEY

    return jwt.sign({ data }, key, { expiresIn })
  }
}
