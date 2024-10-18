import crypto from 'crypto'

class Otp {
  /**
   * Generates a random one-time password (OTP) of the specified length.
   *
   * @param {number} [length=6] - The length of the OTP to generate.
   * @returns {string} The generated OTP as a string.
   */
  generate(length = 6) {
    return crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
  }
}

export default new Otp()
