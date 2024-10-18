class Otp {
  generate(length = 6) {
    return crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
  }
}

export default new Otp()
