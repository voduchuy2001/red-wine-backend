import Mail from '@config/mail'

class VerificationEmail extends Mail {
  constructor(data) {
    super(data)
  }

  envelop() {
    return {
      from: this.data.from || process.env.MAIL_FROM_ADDRESS,
      to: this.data.to,
      subject: __('Verification Email')
    }
  }

  async content() {
    const context = {
      otp: this.data.otp,
      expirationTime: this.data.expirationTime
    }

    return super.content('auth.verification', context)
  }
}

export default VerificationEmail
