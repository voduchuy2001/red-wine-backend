import Mail from '@config/mail'

class ForgotPasswordEmail extends Mail {
  constructor(data) {
    super(data)
  }

  envelop() {
    return {
      from: this.data.from || process.env.MAIL_FROM_ADDRESS,
      to: this.data.to,
      subject: __('Reset Password Email')
    }
  }

  async content() {
    const context = {
      otp: this.data.otp,
      expirationTime: this.data.expirationTime
    }

    return super.content('auth.reset.password', context)
  }
}

export default ForgotPasswordEmail
