import Mail from '@config/mail'

class VerificationEmail extends Mail {
  constructor(mailData) {
    super(mailData)
  }

  envelop() {
    return {
      from: this.mailData.from || process.env.MAIL_FROM_ADDRESS,
      to: this.mailData.to,
      subject: __('Verification Email')
    }
  }

  async content() {
    const context = {
      otp: this.mailData.otp
    }

    return super.content('auth.verification', context)
  }
}

export default VerificationEmail
